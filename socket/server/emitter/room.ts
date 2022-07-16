import { Server, Socket } from "socket.io";
import type {
  SocketRoomJoinedPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
  SocketRoomPlayerMessagePayload,
} from "../../types";
import { SOCKET_SERVER_TO_CLIENT } from "../../constants";

export function emitRoomPlayerJoined(
  roomID: string,
  socket: Socket,
  payload: SocketRoomPlayerJoinedPayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, payload);
  socket.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, payload);
}

export function emitRoomPlayerLeft(
  roomID: string,
  socket: Socket,
  payload: SocketRoomPlayerLeftPayload
) {
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

export function emitRoomPlayerMessage(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomPlayerMessagePayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE);

  //broadcast is to send the message to everbody but the sender
  socket.broadcast
    .to(roomID)
    .emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE, payload);
}
