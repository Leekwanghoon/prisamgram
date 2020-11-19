import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        addComment: async (_, args, {request}) => {
            isAuthenticated(request)
            const { text, postId } = args;
            const { user } = request;
            const comment = await prisma.createComment({
                user: {
                    connect: {
                        id: user.id //현재 로그인된 나의 user.id
                    }
                },
                post: {
                    connect: {
                        id: postId // post하려는 아이디
                    }
                },
                text // 유저가 입력한 text 
            });
            return comment
        }
    }
}