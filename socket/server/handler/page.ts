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
} from "../emitter/page";

import { getPageRoom } from "../utils";

export async function handlePageUserJoin(
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerJoinPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_JOIN, payload);

    const pageRoom = getPageRoom(payload.id);
    if (!socket.rooms.has(pageRoom)) {
      socket.rooms.add(pageRoom);
    }
    socket.join(pageRoom);

    const connectedPlayers = await (
      await socket.in(pageRoom).fetchSockets<ConnectedSocketData>()
    ).map((d) => d.data.user);

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

export async function handlePageUserLeave(socket: Socket, player: IPlayer) {
  const handler = (payload: SocketRoomPlayerLeavePayload) => {
    const pageRoom = getPageRoom(payload.id);

    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE, payload);

    socket.leave(pageRoom);
    emitRoomPlayerLeft(socket, payload.id, {
      id: payload.id,
      senderId: socket.id,
      userId: player.id,
    });
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE, handler);
}
