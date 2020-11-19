import {isAuthenticated} from "../../../middlewares";
import {prisma} from "../../../../generated/prisma-client";


export default {
    Mutation: {
        unfollow: async(_, args, {request}) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = args;
            try {
                await prisma.updateUser({
                    where: {id: user.id},
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                })
                return true;
            } catch(err) {
                return console.log(error,"이 에러는 영국에서부터 시작해 unfollow를 실패한 에러입니다");
            }
        }
    }
}