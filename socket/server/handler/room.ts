import { Socket, Server } from "socket.io";
import { SOCKET_CLIENT_TO_SERVER } from "../../constants";
import RoomManager, { Room } from "../../store";

import { IPlayer, SocketRoomPlayerMessageSendPayload } from "../../types";

import {
  emitRoomJoined,
  emitRoomPlayerJoined,
  emitRoomPlayerLeft,
  emitRoomPlayerMessage,
  emitRoomPlayerMoved,
  emitRoomPlayerRollingDice,
} from "../emitter/room";

export async function handleRoomPlayerJoin(
  room: Room,
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  if (!socket.rooms.has(room.id)) {
    socket.rooms.add(room.id);
  }
  room.addPlayer(player);

  socket.join(room.id);

  emitRoomPlayerJoined(room.id, socket, {
    player,
  });
  emitRoomJoined(server, socket, {
    ...room.serialized,
    player,
  });
}

export async function handleRoomPlayerLeave(
  room: Room,
  roomStore: RoomManager,
  socket: Socket,
  player: IPlayer
) {
  const handler = () => {
    console.log("player disconnected");

    socket.leave(room.id);

    emitRoomPlayerLeft(room.id, socket, {
      playerID: player.id,
    });

    room.removePlayer(player.id);
    if (!room.getPlayerCount()) roomStore.destroyRoom(room.id);
  };

  socket.on("disconnection", handler);
  socket.on("disconnect", handler);
}

export async function handleRoomPlayerMessageSend(
  room: Room,
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

export async function handleRoomPlayerTryMove(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerMessageSendPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, payload);

    // emitRoomPlayerMoved(room.id, server, socket, {});
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, handler);
}

export async function handleRoomPlayerTryDice(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerMessageSendPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, payload);

    // emitRoomPlayerRollingDice(room.id, server, socket, {});
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, handler);
}
