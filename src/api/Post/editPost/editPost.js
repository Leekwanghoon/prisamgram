import { prisma } from "../../../../generated/prisma-client";


const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
    Mutation: {
        editPost: async(_,args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;//user.id는 유저아이디
            const { id ,caption, location, action } = args;//id는 postId
            const post = await prisma.$exists.post({id, user:{id:user.id}});
            if(post) {
                if(action === EDIT) {
                    return prisma.updatePost({
                        data: {
                            caption,
                            location
                        },
                        where:{id}  //postId prisma post에 caption,location을 수정해부러
                    });
                } else if( action === DELETE) {
                    return prisma.deletePost({id})
                }
            } else {
                throw Error("You can't do that");
            }
        }
    }
}