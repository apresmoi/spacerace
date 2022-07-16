import { Socket } from "socket.io";
import { DefaultEventsMap, EventsMap } from "socket.io/dist/typed-events";

export type IDice = [number, number];

export type IPosition = {
  x: number;
  y: number;
};

export type ICell = IPosition & {
  type: string;
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

export type IRoomTurnStage =
  | "WAITING_FOR_START"
  | "WAITING_FOR_ROLL"
  | "ROLLING_DICES"
  | "WAITING_FOR_MOVE";

export type IRoomSubscribers = {
  onPlayerMove: Array<(player: IPlayer, position: IPosition) => void>;
  onTurnChange: Array<(player: IPlayer, turn: IRoomTurnStage) => void>;
  onDiceRolled: Array<(player: IPlayer, dice: IDice) => void>;
};

export type IRoom = {
  id: string;
  name: string;

  playerStartPosition: IPosition;

  players: IPlayer[];
  currentTurnPlayerID?: string;

  width: number;
  height: number;
  cells: ICell[];
  effects: ICell[];

  currentDice: IDice;
  started: boolean;
  startedAt?: Date;

  turnStage: IRoomTurnStage;
};

export type IRoomList = Pick<IRoom, "id" | "name"> & {
  playerCount: number;
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
export type SocketRoomPlayerStartPayload = {};

export type SocketRoomPlayerTryDicePayload = {};
export type SocketRoomPlayerMessageSendPayload = {
  message: Pick<IMessage, "content">;
};

//server to client

export type SocketRoomJoinedPayload = {
  room: IRoom;
  playerID: string;
};

export type SocketRoomPlayerJoinedPayload = {
  player: IPlayer;
};

export type SocketRoomPlayerLeftPayload = {
  playerID: string;
};

export type SocketRoomPlayerTurnChangePayload = {
  playerID: string;
  turn: IRoomTurnStage;
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
  position: IPosition;
};

export type SocketRoomPlayerMessagePayload = {
  message: IMessage;
};
