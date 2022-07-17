import * as React from "react";
import { useSound } from "../assets";
import { IMessage } from "../socket/types";
import {
  useRoomPlayerMessageSend,
  useSocketRoomPlayerMessage,
} from "./SocketStore";

type IChatStoreContext = {
  messages: IMessage[];
  sendMessage: (content: string) => void;
};

export const ChatStoreContext = React.createContext<IChatStoreContext>({
  messages: [],
  sendMessage: () => {},
});

export function useChat() {
  return React.useContext(ChatStoreContext);
}

export function ChatStoreProvider(props: React.PropsWithChildren<{}>) {
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const sendMessage = useRoomPlayerMessageSend();

  useSocketRoomPlayerMessage((payload) => {
    setMessages((list) => [...list, payload.message]);
  });

  const contextValue = React.useMemo(
    () => ({
      messages,
      sendMessage,
    }),
    [messages, sendMessage]
  );

  return (
    <ChatStoreContext.Provider value={contextValue}>
      {props.children}
    </ChatStoreContext.Provider>
  );
}
