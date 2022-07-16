import * as React from "react";
import { IPlayer, IPosition, IRoom } from "../socket/types";
import { uniquePredicate } from "../utils/array";
import {
  useRoomPlayerStart,
  useRoomPlayerTryDice,
  useRoomPlayerTryMove,
  useSocketRoomJoined,
  useSocketRoomPlayerJoined,
  useSocketRoomPlayerLeft,
  useSocketRoomPlayerMoved,
  useSocketRoomPlayerRollDice,
  useSocketRoomPlayerTurnChange,
} from "./SocketStore";

type IGameStoreContext = {
  tryMove: (position: IPosition) => void;
  tryDice: () => void;
  tryStart: () => void;
  room?: IRoom;
  player?: IPlayer;
  turnPlayer?: IPlayer;
};

export const GameStoreContext = React.createContext<IGameStoreContext>({});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [playerID, setPlayerID] = React.useState();
  const [room, setRoom] = React.useState<IRoom>();

  const tryStart = useRoomPlayerStart();
  const tryMove = useRoomPlayerTryMove();
  const tryDice = useRoomPlayerTryDice();

  const player = React.useMemo(() => {
    if (!room) return undefined;
    return room.players.find((p) => p.id === playerID);
  }, [room, playerID]);

  const turnPlayer = React.useMemo(() => {
    if (!room) return undefined;
    return room.players.find((p) => p.id === room.currentTurnPlayerID);
  }, [room]);

  useSocketRoomJoined((payload) => {
    setRoom(payload);
    setPlayerID(payload.player.id);
  });

  useSocketRoomPlayerJoined((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        players: [...room.players, payload.player].filter(
          (u, i, arr) => arr.findIndex((v) => v.id === u.id) === i
        ),
      };
    });
  });

  useSocketRoomPlayerLeft((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        players: room.players.filter((p) => p.id !== payload.playerID),
      };
    });
  });

  useSocketRoomPlayerTurnChange((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        currentTurnPlayerID: payload.playerID,
        turnStage: payload.turn,
      };
    });
  });

  useSocketRoomPlayerRollDice((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        currentTurnPlayerID: payload.playerID,
        currentDice: payload.dice,
      };
    });
  });

  useSocketRoomPlayerMoved((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        players: room.players.map((player) =>
          player.id === payload.playerID
            ? { ...player, ...payload.position }
            : player
        ),
      };
    });
  });

  const contextValue = React.useMemo(
    () => ({ tryMove, tryDice, tryStart, player, turnPlayer, room }),
    [tryMove, tryDice, tryStart, player, turnPlayer, room]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
