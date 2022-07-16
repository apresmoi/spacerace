import { Socket, Server } from "socket.io";

import { SOCKET_CLIENT_TO_SERVER } from "../../constants";

import {
  ConnectedSocketData,
  IPlayer,
  SocketRoomPlayerJoinPayload,
  SocketRoomPlayerLeavePayload,
} from "../../types";

import {
  emitRoomJoined,
  emitRoomPlayerJoined,
  emitRoomPlayerLeft,
} from "../emitter/room";

import { getRoomID } from "../utils";

export async function handleRoomPlayerJoin(
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerJoinPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_JOIN, payload);

    const roomID = getRoomID(payload.id);
    if (!socket.rooms.has(roomID)) {
      socket.rooms.add(roomID);
    }
    socket.join(roomID);

    const connectedPlayers = await (
      await socket.in(roomID).fetchSockets<ConnectedSocketData>()
    ).map((d) => d.data.player);

    emitRoomPlayerJoined(socket, payload.id, {
      id: payload.id,
      player,
      senderId: socket.id,
    });
    emitRoomJoined(server, socket, {
      id: payload.id,
      player,
      players: connectedPlayers,
    });
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_JOIN, handler);
}

export async function handleRoomPlayerLeave(socket: Socket, player: IPlayer) {
  const handler = (payload: SocketRoomPlayerLeavePayload) => {
    const roomID = getRoomID(payload.id);

    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE, payload);

    socket.leave(roomID);
    emitRoomPlayerLeft(socket, payload.id, {
      id: payload.id,
      senderId: socket.id,
      userId: player.id,
    });
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE, handler);
}
