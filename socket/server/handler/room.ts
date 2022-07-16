import { Socket, Server } from "socket.io";
import { SOCKET_CLIENT_TO_SERVER } from "../../constants";
import RoomManager from "../../store";

import {
  IPlayer,
  IRoom,
  SocketRoomPlayerMessageSendPayload,
} from "../../types";

import {
  emitRoomJoined,
  emitRoomPlayerJoined,
  emitRoomPlayerLeft,
  emitRoomPlayerMessage,
} from "../emitter/room";

export async function handleRoomPlayerJoin(
  room: IRoom,
  roomStore: RoomManager,
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  if (!socket.rooms.has(room.id)) {
    socket.rooms.add(room.id);
  }
  roomStore.addPlayer(room.id, player);

  socket.join(room.id);

  emitRoomPlayerJoined(room.id, socket, {
    player,
  });
  emitRoomJoined(server, socket, {
    ...room,
    player,
  });
}

export async function handleRoomPlayerLeave(
  room: IRoom,
  roomStore: RoomManager,
  socket: Socket,
  player: IPlayer
) {
  const handler = () => {
    socket.leave(room.id);

    emitRoomPlayerLeft(room.id, socket, {
      playerID: player.id,
    });

    roomStore.removePlayer(room.id, player.id);
    if (!roomStore.getPlayerCount(room.id)) roomStore.destroyRoom(room.id);
  };

  socket.on("disconnection", handler);
}

export async function handleRoomPlayerMessageSend(
  room: IRoom,
  _roomStore: RoomManager,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerMessageSendPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND, payload);

    emitRoomPlayerMessage(room.id, server, socket, {
      message: { ...payload.message, date: new Date(), playerID: player.id },
    });
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND, handler);
}
