import * as React from "react";
import { useSound } from "../assets";

type IGameStoreContext = {};

export const GameStoreContext = React.createContext<IGameStoreContext>({});

export function useGame() {
  return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
  const contextValue = React.useMemo(() => ({}), []);

  return (
    <GameStoreContext.Provider value={contextValue}>
      {props.children}
    </GameStoreContext.Provider>
  );
}
