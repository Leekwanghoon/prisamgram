import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser:  (_, args, {request, isAuthenticated} ) => {
            isAuthenticated(request);
            const { user } = request;
            const {username, email, firstName, lastName, bio, avatar} = args;
            return prisma.updateUser({where: {id:user.id},
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    bio,
                    avatar
                }
            })
        }
    }
};