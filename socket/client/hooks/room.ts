import React from "react";
import { SOCKET_SERVER_TO_CLIENT } from "../../constants";
import {
  SocketRoomJoinedPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
} from "../../types";
import { useSocket } from "../SocketStore";

//** This gets triggered when the current user joins */
export function useSocketRoomJoined(
  id?: string,
  onJoin?: (payload: SocketRoomJoinedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocket();

  React.useEffect(() => {
    const handler = (payload: SocketRoomJoinedPayload) => {
      if (payload.id === id) onJoin?.(payload);
    };

    if (id) {
      subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, handler);

      return () => {
        unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, handler);
      };
    }
  }, [subscribe, unsubscribe, id, onJoin]);
}

//** This gets triggered when a user joins the page */
export function useSocketRoomPlayerJoined(
  id?: string,
  onJoin?: (payload: SocketRoomPlayerJoinedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocket();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerJoinedPayload) => {
      if (payload.id === id) onJoin?.(payload);
    };

    if (id) {
      subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, handler);

      return () => {
        unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, handler);
      };
    }
  }, [subscribe, unsubscribe, id, onJoin]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerLeft(
  id?: string,
  onLeave?: (payload: SocketRoomPlayerLeftPayload) => void
) {
  const { subscribe, unsubscribe } = useSocket();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerLeftPayload) => {
      if (payload.id === id) onLeave?.(payload);
    };

    if (id) {
      subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, handler);

      return () => {
        unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, handler);
      };
    }
  }, [subscribe, unsubscribe, id, onLeave]);
}
