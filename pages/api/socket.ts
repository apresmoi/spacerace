import type { NextApiRequest, SocketNextApiResponse } from "next";
import { socketHandler } from "../../socket/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  _req: NextApiRequest,
  res: SocketNextApiResponse<any>
) {
  socketHandler(res);
  res.end();
}
