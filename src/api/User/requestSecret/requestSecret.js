import {prisma} from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args, { request }) => {
            console.log(request.user);
            const {email} = args;
            const loginSecret = generateSecret();  //빤스입은 천하무적
            try {
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data: {
                        loginSecret
                    }, where: {
                        email
                    }})
                return true;
            } catch (e)  {
                console.log(e);
                return false;
            }
        }
    }
}