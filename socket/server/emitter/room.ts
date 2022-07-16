import { Server, Socket } from "socket.io";
import type {
  SocketRoomJoinedPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
  SocketRoomPlayerMessagePayload,
  SocketRoomPlayerMovedPayload,
  SocketRoomPlayerRollDicePayload,
  SocketRoomPlayerRollingDicePayload,
  SocketRoomPlayerTurnChangePayload,
  SocketRoomStartedPayload,
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

  server.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE, payload);

  //broadcast is to send the message to everbody but the sender
  // socket.broadcast
  //   .to(roomID)
  //   .emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE, payload);
}

export function emitRoomPlayerMoved(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomPlayerMovedPayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MOVED);
  server.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MOVED, payload);
}

export function emitRoomPlayerRollingDice(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomPlayerRollingDicePayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLLING_DICE);
  server
    .to(roomID)
    .emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLLING_DICE, payload);
}

export function emitRoomPlayerRollDice(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomPlayerRollDicePayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLL_DICE);
  server
    .to(roomID)
    .emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLL_DICE, payload);
}

export function emitRoomPlayerTurnChange(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomPlayerTurnChangePayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_TURN_CHANGE);
  server
    .to(roomID)
    .emit(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_TURN_CHANGE, payload);
}

export function emitRoomPlayerStarted(
  roomID: string,
  server: Server,
  socket: Socket,
  payload: SocketRoomStartedPayload
) {
  console.log(SOCKET_SERVER_TO_CLIENT.ROOM_STARTED);
  server.to(roomID).emit(SOCKET_SERVER_TO_CLIENT.ROOM_STARTED, payload);
}
