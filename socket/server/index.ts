import type { SocketNextApiResponse } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";

import { handleRoomPlayerJoin, handleRoomPlayerLeave } from "./handler/room";
import { ConnectedSocket } from "../types";

export function socketHandler(res: SocketNextApiResponse<any>) {
  if (!res.socket.server.io) {
    //This will be executed just once. When this route is first accessed.
    console.log("Starting Socket.io Server.");
    const httpServer: NetServer = res.socket.server as any;
    const server = new ServerIO(httpServer, {
      path: "/api/socket",
    });

    server.on("connection", async (socket: ConnectedSocket) => {
      console.log("Socket connected", socket.id);

      const player = {
        id: socket.id,
        name: "Hola",
      };

      socket.data = {
        player,
      };

      handleRoomPlayerJoin(server, socket, player);
      handleRoomPlayerLeave(socket, player);
    });

    server.on("disconnection", (socket: Socket) => {});

    // Append Socket.IO server for all the requests that follow.
    res.socket.server.io = server;
  } else {
    console.log("Socker.io is already running.");
  }
}
