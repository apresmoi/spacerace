import { SOCKET_CLIENT_TO_SERVER } from "../../socket/constants";
import { useSocketStore } from "./SocketStore";
import React from "react";
import {
  IPosition,
  SocketRoomPlayerMessageSendPayload,
  SocketRoomPlayerTryDicePayload,
  SocketRoomPlayerTryMovePayload,
} from "../../socket/types";

export function useRoomPlayerTryMove() {
  const { emitInmediate } = useSocketStore();

  return React.useMemo(() => {
    const handler = (payload: SocketRoomPlayerTryMovePayload) => {
      if (emitInmediate)
        emitInmediate(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, payload);
    };

    return (position: IPosition) => {
      handler({ position });
    };
  }, [emitInmediate]);
}

export function useRoomPlayerTryDice() {
  const { emitInmediate } = useSocketStore();

  return React.useMemo(() => {
    const handler = (payload: SocketRoomPlayerTryDicePayload) => {
      if (emitInmediate)
        emitInmediate(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DICE, payload);
    };

    return () => {
      handler({});
    };
  }, [emitInmediate]);
}

export function useRoomPlayerMessageSend() {
  const { emitInmediate } = useSocketStore();

  return React.useMemo(() => {
    const handler = (payload: SocketRoomPlayerMessageSendPayload) => {
      if (emitInmediate)
        emitInmediate(
          SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND,
          payload
        );
    };

    return (content: string) => {
      handler({ message: { content } });
    };
  }, [emitInmediate]);
}
