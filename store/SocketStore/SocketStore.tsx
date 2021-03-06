import debounce from "lodash.debounce";
import * as React from "react";
import { io, Socket } from "socket.io-client";
import {
  SOCKET_CLIENT_TO_SERVER,
  SOCKET_SERVER_TO_CLIENT,
} from "../../socket/constants";
import { useSubscriber } from "../../hooks";
import { ENABLE_SOCKET_LOGGING, SOCKET_DEBOUNCE_MS } from "../../settings";
import {
  ISocketStore,
  SocketEmitterMap,
  SocketStoreEmitters,
  SocketStoreSubscribers,
} from "./types";
import { ValueOf } from "../../types/global";

const SocketStore = React.createContext<ISocketStore>({
  connected: false,
  connect: () => {},
  disconnect: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
});

export function useSocketStore() {
  return React.useContext(SocketStore);
}

interface SocketStoreProvider {
  children: React.ReactNode;
}

export function SocketStoreProvider(props: SocketStoreProvider) {
  const [socket, setSocket] = React.useState<Socket>();
  const subscribers = useSubscriber<SOCKET_SERVER_TO_CLIENT, any, void>();

  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/socket");
  }, []);

  const connect = React.useCallback((id: string, name: string) => {
    const socket = io(`?id=${id}&name=${name}`, {
      path: "/api/socket",
      autoConnect: false,
    });

    socket.on("connect", () => {
      if (ENABLE_SOCKET_LOGGING) console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      if (ENABLE_SOCKET_LOGGING) console.log("Disconnected from server");
    });

    for (let key in SOCKET_SERVER_TO_CLIENT) {
      socket.on(key, (payload) => {
        if (ENABLE_SOCKET_LOGGING) console.log(key, payload);
        subscribers.trigger(key as SOCKET_SERVER_TO_CLIENT, payload);
      });
    }

    socket.connect();
    setSocket(socket);
    setConnected(true);
  }, []);

  const disconnect = React.useCallback(() => {
    socket?.disconnect();
    setSocket(undefined);
    setConnected(false);
  }, []);

  const subscribe = React.useMemo(() => {
    return ((event, callback) => {
      subscribers.addSubscriber(event, callback);
    }) as SocketStoreSubscribers;
  }, []);

  const unsubscribe = React.useMemo(() => {
    return ((event, callback) => {
      subscribers.removeSubscriber(event, callback);
    }) as SocketStoreSubscribers;
  }, []);

  const emit = React.useMemo(() => {
    if (socket) {
      const emitters: {
        [key: string]: (payload: ValueOf<SocketEmitterMap>) => void;
      } = {};
      for (const key in SOCKET_CLIENT_TO_SERVER) {
        emitters[key] = debounce((payload) => {
          if (ENABLE_SOCKET_LOGGING) console.log(key, payload);
          socket?.emit(key, payload);
        }, SOCKET_DEBOUNCE_MS);
      }

      return ((key, payload) => emitters[key](payload)) as SocketStoreEmitters;
    }
    return undefined;
  }, [socket]);

  const emitInmediate = React.useMemo(() => {
    if (socket) {
      return ((key, payload) => {
        if (ENABLE_SOCKET_LOGGING) console.log(key, payload);
        socket?.emit(key, payload);
      }) as SocketStoreEmitters;
    }
    return undefined;
  }, [socket]);

  const contextValue = React.useMemo(() => {
    return {
      connected,
      connect,
      disconnect,
      socket,
      subscribe,
      unsubscribe,
      emit,
      emitInmediate,
    };
  }, [socket]);

  return (
    <SocketStore.Provider value={contextValue}>
      {props.children}
    </SocketStore.Provider>
  );
}
