import React from "react";
import { SOCKET_SERVER_TO_CLIENT } from "../../socket/constants";
import {
  SocketRoomJoinedPayload,
  SocketRoomPlayerJoinedPayload,
  SocketRoomPlayerLeftPayload,
  SocketRoomPlayerMessagePayload,
  SocketRoomPlayerMovedPayload,
  SocketRoomPlayerRollDicePayload,
  SocketRoomPlayerRollingDicePayload,
  SocketRoomPlayerTurnChangePayload,
  SocketRoomStartedPayload,
} from "../../socket/types";
import { useSocketStore } from "./SocketStore";

//** This gets triggered when the current user joins */
export function useSocketRoomJoined(
  onJoin?: (payload: SocketRoomJoinedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomJoinedPayload) => {
      onJoin?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_JOINED, handler);
    };
  }, [subscribe, unsubscribe, onJoin]);
}

//** This gets triggered when a user joins the page */
export function useSocketRoomPlayerJoined(
  onJoin?: (payload: SocketRoomPlayerJoinedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerJoinedPayload) => {
      onJoin?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_JOINED, handler);
    };
  }, [subscribe, unsubscribe, onJoin]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerLeft(
  onLeave?: (payload: SocketRoomPlayerLeftPayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerLeftPayload) => {
      onLeave?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_LEFT, handler);
    };
  }, [subscribe, unsubscribe, onLeave]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerTurnChange(
  onTurnChange?: (payload: SocketRoomPlayerTurnChangePayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerTurnChangePayload) => {
      onTurnChange?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_TURN_CHANGE, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_TURN_CHANGE, handler);
    };
  }, [subscribe, unsubscribe, onTurnChange]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerRollingDice(
  onRollingDice?: (payload: SocketRoomPlayerRollingDicePayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerRollingDicePayload) => {
      onRollingDice?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLLING_DICE, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLLING_DICE, handler);
    };
  }, [subscribe, unsubscribe, onRollingDice]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerRollDice(
  onRollDice?: (payload: SocketRoomPlayerRollDicePayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerRollDicePayload) => {
      onRollDice?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLL_DICE, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_ROLL_DICE, handler);
    };
  }, [subscribe, unsubscribe, onRollDice]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerMoved(
  onMoved?: (payload: SocketRoomPlayerMovedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerMovedPayload) => {
      onMoved?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MOVED, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MOVED, handler);
    };
  }, [subscribe, unsubscribe, onMoved]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomPlayerMessage(
  onMessage?: (payload: SocketRoomPlayerMessagePayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomPlayerMessagePayload) => {
      onMessage?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_PLAYER_MESSAGE, handler);
    };
  }, [subscribe, unsubscribe, onMessage]);
}

//** This gets triggered when a user leaves the page */
export function useSocketRoomStarted(
  onStart?: (payload: SocketRoomStartedPayload) => void
) {
  const { subscribe, unsubscribe } = useSocketStore();

  React.useEffect(() => {
    const handler = (payload: SocketRoomStartedPayload) => {
      onStart?.(payload);
    };

    subscribe(SOCKET_SERVER_TO_CLIENT.ROOM_STARTED, handler);

    return () => {
      unsubscribe(SOCKET_SERVER_TO_CLIENT.ROOM_STARTED, handler);
    };
  }, [subscribe, unsubscribe, onStart]);
}
