import { SOCKET_CLIENT_TO_SERVER } from "../../constants";
import { useSocket } from "../SocketStore";
import React from "react";

export function usePageJoin(id?: string) {
  const { emit } = useSocket();

  React.useEffect(() => {
    if (id && emit) {
      emit(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_JOIN, { id });

      return () => {
        emit(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_LEAVE, { id });
      };
    }
  }, [id, emit]);
}
