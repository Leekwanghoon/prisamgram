import { prisma } from '../../../../generated/prisma-client';
export default {
    Mutation: {
        createAccount: async(_, args) => {
            const{ username, name, email, firstName="", lastName, bio=""} = args;
            
            const exists = await prisma.$exists.user({
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            });
            if(exists) {
                throw Error("This username is already");
            }
            await prisma.createUser({
                username,
                name,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
            }
        }
    }
