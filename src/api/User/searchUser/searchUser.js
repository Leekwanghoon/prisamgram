//유저를 찾는데 인증과정따윈 생략한다!
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async (_, args) =>
            prisma.users({
                where: {
                    OR: [
                        { username_contains: args.term },
                        { firstName_contains: args.term },
                        { lastName_contains: args.term }
                    ]
                }
            })
    }
}