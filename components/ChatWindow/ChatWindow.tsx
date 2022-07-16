import React from "react";
import { IMessage } from "../../socket/types";
import { useChat, useGame } from "../../store";
import {
  useRoomPlayerMessageSend,
  useSocketRoomPlayerMessage,
} from "../../store/SocketStore";
import styles from "./ChatWindow.module.scss";

export function ChatWindow() {
  const { messages, sendMessage } = useChat();
  const { room } = useGame();

  const [message, setMessage] = React.useState("");

  const handleMessageSubmit = React.useCallback(() => {
    sendMessage(message);
    setMessage("");
  }, [sendMessage, message]);

  const handleMessageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setMessage(value);
    },
    []
  );

  const getPlayerName = React.useCallback(
    (playerID: string) => {
      if (!room) return "";
      return room.players.find((player) => player.id === playerID)?.name || "";
    },
    [room]
  );

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatWindowMessages}>
        {messages.map((m, i) => (
          <div key={i} className={styles.chatWindowMessage}>
            {getPlayerName(m.playerID)}: {m.content}
          </div>
        ))}
      </div>
      <div className={styles.chatWindowInput}>
        <input value={message} onChange={handleMessageChange} />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
}
