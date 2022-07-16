import { Server, Socket } from "socket.io";
import type {
  SocketRoomJoinedPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
} from "../../types";
import { SOCKET_SERVER_TO_CLIENT } from "../../constants";
import { getRoomID } from "../utils";

export function emitRoomPlayerJoined(
  socket: Socket,
  id: string,
  payload: SocketRoomPlayerJoinedPayload
) {
  const roomID = getRoomID(id);
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, payload);
  socket.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, payload);
}

export function emitRoomPlayerLeft(
  socket: Socket,
  id: string,
  payload: SocketRoomPlayerLeftPayload
) {
  const roomID = getRoomID(id);
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, payload);
  socket.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, payload);
}

export function emitRoomJoined(
  server: Server,
  socket: Socket,
  payload: SocketRoomJoinedPayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, payload);
  server.to(socket.id).emit(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, payload);
}
