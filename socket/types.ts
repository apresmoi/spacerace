import { Socket } from "socket.io";
import { DefaultEventsMap, EventsMap } from "socket.io/dist/typed-events";

export type IPlayer = {
  id: string;
  name: string;
};

export type IRoom = {
  id: string;
  name: string;
  players: IPlayer[];
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

export type SocketRoomPlayerJoinPayload = Pick<IRoom, "id">;

export type SocketRoomPlayerLeavePayload = Pick<IRoom, "id">;

//server to client

export type SocketRoomJoinedPayload = Pick<IRoom, "id"> & {
  player: IPlayer;
  players: IPlayer[];
};

export type SocketRoomPlayerLeftPayload = Pick<IRoom, "id"> & {
  senderId: string;
  userId: string;
};

export type SocketRoomPlayerJoinedPayload = Pick<IRoom, "id"> & {
  senderId: string;
  player: IPlayer;
};
