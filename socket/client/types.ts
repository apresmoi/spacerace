import { Socket } from "socket.io-client";
import { SOCKET_CLIENT_TO_SERVER, SOCKET_SERVER_TO_CLIENT } from "../constants";
import { EmitRecord, ListenRecord, MakeOverloadings } from "../../types/global";
import {
  SocketRoomPlayerJoinPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeavePayload,
  SocketRoomPlayerLeftPayload,
  SocketRoomJoinedPayload,
} from "../types";

//SocketRoomSubscribers

export type SocketEventsMap = {
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED]: SocketRoomPlayerJoinedPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT]: SocketRoomPlayerLeftPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_JOINED]: SocketRoomJoinedPayload;
};

export type SocketStoreSubscribers = MakeOverloadings<
  ListenRecord<SocketEventsMap>
>;

export type SocketEmitterMap = {
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_JOIN]: SocketRoomPlayerJoinPayload;
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE]: SocketRoomPlayerLeavePayload;
};

export type SocketStoreEmitters = MakeOverloadings<
  EmitRecord<SocketEmitterMap>
>;

export interface ISocketStore {
  socket?: Socket;

  subscribe: SocketStoreSubscribers;
  unsubscribe: SocketStoreSubscribers;

  emit?: SocketStoreEmitters;
  emitInmediate?: SocketStoreEmitters;
}
