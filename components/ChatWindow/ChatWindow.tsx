import React from "react";
import { IMessage } from "../../socket/types";
import { useChat, useGame } from "../../store";
import { className } from "../../utils/classnames";
import styles from "./ChatWindow.module.scss";

export function ChatWindow() {
  const { messages, sendMessage } = useChat();
  const { room, player } = useGame();

  const ref = React.useRef<HTMLDivElement>(null);

  const [message, setMessage] = React.useState("");

  const handleMessageSubmit = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (message) {
        sendMessage(message);
        setMessage("");
      }
    },
    [sendMessage, message]
  );

  const handleMessageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setMessage(value);
    },
    []
  );

  const isMyMessage = React.useCallback(
    (message: IMessage) => {
      if (player) {
        return message.playerID === player.id;
      }
      return false;
    },
    [player]
  );

  const getPlayerName = React.useCallback(
    (playerID: string) => {
      if (!room) return "";
      return room.players.find((player) => player.id === playerID)?.name || "";
    },
    [room]
  );

  React.useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      ref.current.scrollTo(0, height);
    }
  }, [messages]);

  return (
    <form className={styles.chatWindow}>
      <div className={styles.chatTitle}>SPACE CHAT</div>
      <div ref={ref} className={styles.chatWindowMessages}>
        <div className={styles.chatWindowMessagesInner}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={className(
                styles.chatWindowMessage,
                isMyMessage(m) && styles.myMessage
              )}
            >
              <span>{getPlayerName(m.playerID)}</span>
              <span className={`${styles.messageContent} messageContent`}>{m.content}</span>
            </div>
          ))}
        </div>
      </div>
      <input value={message} onChange={handleMessageChange} />
      <button type="submit" onClick={handleMessageSubmit}>
        SEND
      </button>
    </form>
  );
}
