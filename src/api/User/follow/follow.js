import {isAuthenticated} from "../../../middlewares";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        follow: async (_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request
            const {id} = args;
            console.log(user,id);
            try {
                await prisma.updateUser({
                    where: { id: user.id },
                    data: {
                        following: {
                          connect: {
                                id
                            }
                        }
                    }
                })
                return true;
            } catch(error)  {
                return console.log(error);
            }
        }
    }
}