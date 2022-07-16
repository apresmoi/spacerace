import type { NextApiRequest, SocketNextApiResponse } from "next";
import { socketHandler } from "../../socket/server";
import { getRandomName } from "../../utils/names";
import { v4 as uuid } from "uuid";
import store from "../../socket/store";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: SocketNextApiResponse<any>
) {
  if (req.method === "GET") {
    const rooms = res.socket.server.rooms.getRooms();

    return res
      .status(200)
      .json(rooms.map((room) => ({ id: room.id, name: room.name })));
  } else if (req.method === "POST") {
    const room = res.socket.server.rooms.addRoom(req.body.name);
    return res.status(200).json(room);
  }
}
