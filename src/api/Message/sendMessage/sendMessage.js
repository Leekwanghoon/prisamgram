//흐름
//1. room을 찾거나 만든다 , fragment가 존재해 participants를 가져오고 싶어서 fragment를 이용
//2. 만약 roomId가 !== undefined라면 room을 가져와
//3. room이 없으면 error출력

import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request
            const { roomId, message, toId } = args;
            let room;

            if( roomId === undefined) {
                if(user.id !== toId) {
                    room = await prisma
                        .createRoom({
                            participants: {
                                connect:[{id: toId},{id: user.id}]
                            }
                        }).
                        $fragment(ROOM_FRAGMENT);
                    console.log(room,"roomId없는경우"); // {id:"dasdad"}, 
                }
            } else {
                room = await prisma.room({id: roomId}).$fragment(ROOM_FRAGMENT);
            }
            if(!room) {
                throw Error("Room not found");
            }
            const getTo = room.participants.filter(
                participant => participant.id !== user.id
            )[0];
            return prisma.createMessage({
                text:message, 
                from: {
                    connect: {id: user.id}
                },
                to: {
                    connect:{
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        } 
    }
}