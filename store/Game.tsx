import { useRouter } from "next/router";
import * as React from "react";
import { useSound } from "../assets";
import { useMusic } from "../hooks/useMusic";
import { IPlayer, IPosition, IRoom } from "../socket/types";
import { uniquePredicate } from "../utils/array";
import {
  useRoomPlayerStart,
  useRoomPlayerTryDice,
  useRoomPlayerTryMove,
  useSocketPlayerPickupItem,
  useSocketRoomJoined,
  useSocketRoomPlayerJoined,
  useSocketRoomPlayerLeft,
  useSocketRoomPlayerMoved,
  useSocketRoomPlayerRollDice,
  useSocketRoomPlayerTurnChange,
  useSocketRoomStarted,
} from "./SocketStore";

type IGameStoreContext = {
  tryMove: (position: IPosition) => void;
  tryDice: () => void;
  tryStart: () => void;
  room?: IRoom;
  player?: IPlayer;
  turnPlayer?: IPlayer;
  isMyTurn: boolean;
};

export const GameStoreContext = React.createContext<IGameStoreContext>({});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [playerID, setPlayerID] = React.useState<string>();
  const [room, setRoom] = React.useState<IRoom>();
  const router = useRouter();

  const moveSound = useSound("swooshMovement")

  const tryStart = useRoomPlayerStart();
  const tryMove = useRoomPlayerTryMove();
  const tryDice = useRoomPlayerTryDice();
  
  const handleTryDice = React.useCallback((...args) => {
    tryDice(...args);
    moveSound?.play()

  }, [tryDice, moveSound])

  const handleTryStart = React.useCallback((...args) => {
    tryStart(...args);
    moveSound?.play()
  }, [tryStart,moveSound])

  const handleTryMove = React.useCallback((...args) => {
    tryMove(...args);
    moveSound?.play()
  }, [tryMove, moveSound])

  const player = React.useMemo(() => {
    if (!room) return undefined;
    return room.players.find((p) => p.id === playerID);
  }, [room, playerID]);

  const turnPlayer = React.useMemo(() => {
    if (!room) return undefined;
    return room.players.find((p) => p.id === room.currentTurnPlayerID);
  }, [room]);

  const isMyTurn = React.useMemo(() => {
    return (turnPlayer && player && turnPlayer.id === player.id) || false;
  }, [turnPlayer, player]);

  React.useEffect(() => {
    if (room?.turnStage === "END_GAME") {
      setTimeout(() => {
        router.push(isMyTurn ? "/victory" : "/defeat");
      }, 1000);
    }
  }, [room?.turnStage, isMyTurn]);

  useSocketRoomJoined((payload) => {
    setRoom(payload.room);
    setPlayerID(payload.playerID);
  });

  useMusic();

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

  useSocketRoomStarted((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        started: true,
        startedAt: new Date(payload.startedAt),
      };
    });
  });

  useSocketPlayerPickupItem((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        cells: room.cells.map((cell) => {
          if (cell.x === payload.position.x && cell.y === payload.position.y) {
            return {
              ...cell,
              item: undefined,
            };
          }
          return cell;
        }),
        players: room.players.map((player) =>
          player.id === payload.playerID
            ? { ...player, inventory: [...player.inventory, payload.item] }
            : player
        ),
      };
    });
  });

  const contextValue = React.useMemo(
    () => ({ tryMove: handleTryMove, tryDice: handleTryMove, tryStart: handleTryStart, isMyTurn, player, turnPlayer, room }),
    [handleTryMove, handleTryMove, handleTryStart, isMyTurn, player, turnPlayer, room]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
