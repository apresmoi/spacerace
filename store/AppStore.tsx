import * as React from "react";
import { IRoom } from "../socket/types";
import { useSocketStore } from "./SocketStore";

type IAppStoreContext = {
  rooms: (Pick<IRoom, "id" | "name"> & { playerCount: number })[];
  updateRooms: () => void;
  createRoom: (name: string) => Promise<IRoom>;
  name: string;
  changeName: (name: string) => void;
};

export const AppStoreContext = React.createContext<IAppStoreContext>({
  rooms: [],
  updateRooms: () => {},
  createRoom: () => new Promise(() => {}),
  name: "",
  changeName: () => {},
});

export function useAppStore() {
  return React.useContext(AppStoreContext);
}

export function AppStoreProvider(props: React.PropsWithChildren<{}>) {
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    //ssr
    setName(localStorage.getItem("name") || "");
  }, []);

  const [rooms, setRooms] = React.useState<Pick<IRoom, "id" | "name">[]>([]);

  const changeName = React.useCallback((name: string) => {
    localStorage.setItem("name", name);
    setName(name);
  }, []);

  const createRoom = React.useCallback((name: string) => {
    return fetch(`/api/rooms`, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json()) as Promise<IRoom>;
  }, []);

  const updateRooms = React.useCallback(() => {
    fetch(`/api/rooms`)
      .then((response) => response.json())
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      name,
      changeName,
      rooms,
      updateRooms,
      createRoom,
    }),
    [name, changeName, rooms, updateRooms]
  );

  return (
    <AppStoreContext.Provider value={contextValue}>
      {props.children}
    </AppStoreContext.Provider>
  );
}
