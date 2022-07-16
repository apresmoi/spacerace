import { Socket } from "socket.io";
import { DefaultEventsMap, EventsMap } from "socket.io/dist/typed-events";

export type IDice = {
  dice1: number;
  dice2: number;
};

export type IPosition = {
  x: number;
  y: number;
};

export type IMessage = {
  playerID: string;
  date: Date;
  content: string;
};

export type IPlayer = IPosition & {
  id: string;
  name: string;
  isAdmin?: boolean;
};

export type IRoom = {
  id: string;
  name: string;
  players: IPlayer[];
  currentTurnPlayerID?: string;
};

export type ConnectedSocketData = {
  player: IPlayer;
};

export type ConnectedSocket = Socket<
  DefaultEventsMap,
  EventsMap,
  EventsMap,
  ConnectedSocketData
>;

//client to server

export type SocketRoomPlayerTryMovePayload = {
  position: IPosition;
};
export type SocketRoomPlayerTryDicePayload = {};
export type SocketRoomPlayerMessageSendPayload = {
  message: Pick<IMessage, "content">;
};

//server to client

export type SocketRoomJoinedPayload = IRoom & {
  player: IPlayer;
};

export type SocketRoomPlayerJoinedPayload = {
  player: IPlayer;
};

export type SocketRoomPlayerLeftPayload = {
  playerID: string;
};

export type SocketRoomPlayerTurnChangePayload = {
  playerID: string;
};

export type SocketRoomPlayerRollingDicePayload = {
  playerID: string;
};

export type SocketRoomPlayerRollDicePayload = {
  playerID: string;
  dice: IDice;
};

export type SocketRoomPlayerMovedPayload = {
  playerID: string;
  dice: IDice;
};

export type SocketRoomPlayerMessagePayload = {
  message: IMessage;
};
