import {prisma} from "../../../generated/prisma-client";

// User안에 특정 field(fullName)을 제어하는법 fullName:"laalal"가 됨 자신을 call하는 resolvers가
// me 의 user라는 것을 기가맥히게알아버리네 parent 비록 User가 여기서 선언되었지만 seeUser같은곳에서도 사용할 수
// 있다...schema에서 merging했기때문이지
export default {
    User: {
        fullName: (parent) => {
            console.log(parent, "User의 parent");
            return `${parent.firstName} ${parent.lastName}`;
        },
        IsFollowing: async (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent; // parent에서 id를 가지고 나오고 parentId라는 varaible에 집어넣는 방식 fucking sweet
            try {
                return prisma
                    .$exists
                    .user({
                        AND: [
                            {
                                id: parentId
                            }, {
                                followers_some: {
                                    id: user.id
                                }
                            }
                        ]
                    })
                // if (exists) {
                //     return true;
                // } else {
                //     return false;
                // }
                // return exists;
            } catch (error) {
                console.log(error)
            }
        },
        IsSelf: (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent;
            return user.id === parentId
        }
    },
}