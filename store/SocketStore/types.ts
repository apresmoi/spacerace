import { Socket } from "socket.io-client";
import {
  SOCKET_CLIENT_TO_SERVER,
  SOCKET_SERVER_TO_CLIENT,
} from "../../socket/constants";
import { EmitRecord, ListenRecord, MakeOverloadings } from "../../types/global";
import {
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
  SocketRoomJoinedPayload,
  SocketRoomPlayerMessageSendPayload,
  SocketRoomPlayerTryDicePayload,
  SocketRoomPlayerTryMovePayload,
  SocketRoomPlayerTurnChangePayload,
  SocketRoomPlayerRollingDicePayload,
  SocketRoomPlayerRollDicePayload,
  SocketRoomPlayerMovedPayload,
  SocketRoomPlayerMessagePayload,
  SocketRoomPlayerStartPayload,
} from "../../socket/types";

//SocketRoomSubscribers

export type SocketEventsMap = {
  [SOCKET_SERVER_TO_CLIENT.ROOM_JOINED]: SocketRoomJoinedPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED]: SocketRoomPlayerJoinedPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT]: SocketRoomPlayerLeftPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_TURN_CHANGE]: SocketRoomPlayerTurnChangePayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLLING_DICE]: SocketRoomPlayerRollingDicePayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLL_DICE]: SocketRoomPlayerRollDicePayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MOVED]: SocketRoomPlayerMovedPayload;
  [SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE]: SocketRoomPlayerMessagePayload;
};

export type SocketStoreSubscribers = MakeOverloadings<
  ListenRecord<SocketEventsMap>
>;

export type SocketEmitterMap = {
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_START]: SocketRoomPlayerStartPayload;
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE]: SocketRoomPlayerTryMovePayload;
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DICE]: SocketRoomPlayerTryDicePayload;
  [SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND]: SocketRoomPlayerMessageSendPayload;
};

export type SocketStoreEmitters = MakeOverloadings<
  EmitRecord<SocketEmitterMap>
>;

export interface ISocketStore {
  connected: boolean;

  connect: (id: string, name: string) => void;
  disconnect: () => void;

  socket?: Socket;

  subscribe: SocketStoreSubscribers;
  unsubscribe: SocketStoreSubscribers;

  emit?: SocketStoreEmitters;
  emitInmediate?: SocketStoreEmitters;
}
