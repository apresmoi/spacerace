import type { SocketNextApiResponse } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";

import {
  handleRoomPlayerJoin,
  handleRoomPlayerLeave,
  handleRoomPlayerMessageSend,
  handleRoomPlayerStart,
  handleRoomPlayerTryDice,
  handleRoomPlayerTryMove,
} from "./handler/room";
import { ConnectedSocket } from "../types";
import { getRandomName } from "../../utils/names";
import store from "../store";
import RoomManager from "../store";

export function socketHandler(res: SocketNextApiResponse<any>) {
  if (!res.socket.server.io) {
    //This will be executed just once. When this route is first accessed.
    console.log("Starting Socket.io Server.");
    const httpServer: NetServer = res.socket.server as any;
    const server = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    const roomStore = new RoomManager();

    server.on("connection", async (socket: ConnectedSocket) => {
      console.log("Socket connected", socket.id);

      const id = socket.handshake.query.id as string;
      const name = (socket.handshake.query.name as string) || getRandomName();

      const room = roomStore.getRoom(id);

      if (room) {
        const player = room.addPlayer(id, name);

        if (player) {
          socket.data = {
            player,
          };

          handleRoomPlayerJoin(room, server, socket, player);
          handleRoomPlayerLeave(room, roomStore, socket, player);

          handleRoomPlayerStart(room, socket, player);
          handleRoomPlayerMessageSend(room, socket, server, player);
          handleRoomPlayerTryDice(room, socket, server, player);
          handleRoomPlayerTryMove(room, socket, server, player);
        }
      } else {
        socket.disconnect(true);
      }
    });

    server.on("disconnection", (socket: Socket) => {});

    // Append Socket.IO server for all the requests that follow.
    res.socket.server.io = server;
    res.socket.server.rooms = roomStore;
  } else {
    console.log("Socker.io is already running.");
  }
}
