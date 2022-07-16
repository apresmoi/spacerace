import * as React from "react";
import { IStore } from "./types";

interface StoreProvider {
  children: React.ReactNode;
}

export const Store = React.createContext<IStore>({});

export function StoreProvider(props: StoreProvider) {
  const contextValue = React.useMemo(() => {
    return {};
  }, []); //page, handlePageChange

  return <Store.Provider value={contextValue}>{props.children}</Store.Provider>;
}
