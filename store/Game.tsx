import * as React from "react";
import { IPosition, IRoom } from "../socket/types";
import {
  useRoomPlayerStart,
  useRoomPlayerTryDice,
  useRoomPlayerTryMove,
  useSocketRoomJoined,
} from "./SocketStore";

type IGameStoreContext = {
  tryMove: (position: IPosition) => void;
  tryDice: () => void;
  tryStart: () => void;
  room?: IRoom;
};

export const GameStoreContext = React.createContext<IGameStoreContext>({});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const [room, setRoom] = React.useState<IRoom>();

  const tryStart = useRoomPlayerStart();
  const tryMove = useRoomPlayerTryMove();
  const tryDice = useRoomPlayerTryDice();

  useSocketRoomJoined((payload) => {
    console.log({ payload });
    setRoom(payload);
  });

  const contextValue = React.useMemo(
    () => ({ tryMove, tryDice, tryStart, room }),
    [tryMove, tryDice, tryStart, room]
  );

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
