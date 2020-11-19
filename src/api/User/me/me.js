import { prisma } from "../../../../generated/prisma-client"; 


export default {
    Query: {
        me: async (_, args, {request, isAuthenticated}) => {
            console.log(request,"me 의 리퀘스트")
            isAuthenticated(request);
            const { user } = request;
            return await prisma.user({ id:user.id })
        }
    }
}