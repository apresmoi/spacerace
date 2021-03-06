import { useRouter } from "next/router";
import * as React from "react";
import { useSound } from "../assets";
import { useMusic } from "../hooks/useMusic";
import { IItem, IPlayer, IPosition, IRoom } from "../socket/types";
import { uniquePredicate } from "../utils/array";
import {
  useRoomPlayerStart,
  useRoomPlayerTryDice,
  useRoomPlayerTryDropItem,
  useRoomPlayerTryMove,
  useSocketPlayerDropItem,
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
  tryDropItem: (targetPlayerID: string, item: IItem) => void;
  tryDice: () => void;
  tryStart: () => void;
  room?: IRoom;
  player?: IPlayer;
  turnPlayer?: IPlayer;
  isMyTurn: boolean;
};

export const GameStoreContext = React.createContext<IGameStoreContext>({
  tryDice: () => {},
  tryDropItem: () => {},
  tryMove: () => {},
  tryStart: () => {},
  isMyTurn: false,
});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [playerID, setPlayerID] = React.useState<string>();
  const [room, setRoom] = React.useState<IRoom>();
  const router = useRouter();

  const moveSound = useSound("swooshMovement");
  const diceSound = useSound("dice");
  const kiperZone = useSound("kiperZone");
  const saturnZone = useSound("saturnZone");
  const meteorZone = useSound("meteorZone");
  const supernovaZone = useSound("superNovaZone");

  const tryStart = useRoomPlayerStart();
  const tryMove = useRoomPlayerTryMove();
  const tryDice = useRoomPlayerTryDice();
  const tryDropItem = useRoomPlayerTryDropItem();

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
    const activeCells = new Set();

    room?.players.forEach((player) => {
      const activeCell = room.cells.find((cell) => {
        return cell.x === player.x && cell.y === player.y;
      });

      if (
        activeCell &&
        ["KUIPER", "METEOR", "SATURN", "SUPERNOVAE"].includes(activeCell.type)
      ) {
        activeCells.add(activeCell);
      }
    });

    activeCells.forEach((cell: any) => {
      // todo: change music since it sounds bad in conjunction with the main theme
      // if (cell.type === "KUIPER") kiperZone?.play();
      if (cell.type === "METEOR") meteorZone?.play();
      if (cell.type === "SUPERNOVAE") supernovaZone?.play();
      if (cell.type === "SATURN") saturnZone?.play();
    });

    console.log(activeCells.forEach(console.log));
  }, [
    room?.cells,
    room?.players,
    kiperZone,
    meteorZone,
    supernovaZone,
    saturnZone,
  ]);

  React.useEffect(() => {
    if (room?.turnStage === "END_GAME") {
      setTimeout(() => {
        if (isMyTurn) router.push("/victory");
        else router.push("/defeat");
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

  useSocketPlayerDropItem((payload) => {
    setRoom((room) => {
      if (!room) return room;

      return {
        ...room,
        cells: room.cells.map((cell) => {
          if (cell.x === payload.position.x && cell.y === payload.position.y) {
            return {
              ...cell,
              item: payload.item,
            };
          }
          return cell;
        }),
        players: room.players.map((player) =>
          player.id === payload.playerID
            ? {
                ...player,
                inventory: player.inventory.filter((i) => i !== payload.item),
              }
            : player
        ),
      };
    });
  });

  const handleTryDice = React.useCallback(() => {
    const canRollDice = room?.turnStage === "WAITING_FOR_ROLL" && isMyTurn;
    if (canRollDice) {
      diceSound?.play();
    }
    tryDice();
  }, [tryDice, diceSound, room?.turnStage, isMyTurn]);

  const handleTryStart = React.useCallback(() => {
    tryStart();
    moveSound?.play();
  }, [tryStart, moveSound]);

  const handleTryMove = React.useCallback(
    (position: IPosition) => {
      tryMove(position);
      moveSound?.play();
    },
    [tryMove, moveSound]
  );

  const handleTryDropItem = React.useCallback(
    (targetPlayerID: string, item: IItem) => {
      tryDropItem(targetPlayerID, item);
    },
    [tryDropItem, moveSound]
  );

  const contextValue = React.useMemo(
    () => ({
      tryMove: handleTryMove,
      tryDice: handleTryDice,
      tryStart: handleTryStart,
      tryDropItem: handleTryDropItem,
      isMyTurn,
      player,
      turnPlayer,
      room,
    }),
    [
      handleTryDice,
      handleTryMove,
      handleTryStart,
      handleTryDropItem,
      isMyTurn,
      player,
      turnPlayer,
      room,
    ]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
