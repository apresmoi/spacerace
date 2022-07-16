import type { NextApiResponse } from "next";
import type { Server as NetServer, Socket } from "net";
import type { Server as SocketIOServer } from "socket.io";

declare module "next" {
  interface SocketNextApiResponse<T> extends NextApiResponse<T> {
    socket: Socket & {
      server: NetServer & {
        io: SocketIOServer;
      };
    };
  }
}
