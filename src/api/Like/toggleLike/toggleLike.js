import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
      toggleLike: async (_, args, { request }) => {
        isAuthenticated(request);
        const { postId } = args;
        const { user } = request;
        const filterOptions = {
          AND: [
            {
              user: {
                id: user.id //ckhafnf6oyl8309991zgtpcb0
              }
            },
            {
              post: {
                id: postId //ckhg5yx6x8eqo0a26brigj8nh
              }
            }
          ]
        };
        try {
          const existingLike = await prisma.$exists.like(filterOptions);
          if (existingLike) {
            await prisma.deleteManyLikes(filterOptions);
            console.log("좋아요를 제거했다")
          } else {
            await prisma.createLike({
              user: {
                connect: {
                  id: user.id
                }
              },
              post: {
                connect: {
                  id: postId
                }
              }
            });
          }
          console.log("좋아요를 추가했다")
          return true;
        } catch {
          return false;
        }
      }
    }
  };