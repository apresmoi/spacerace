import React from "react";
import { useGame, useSocketStore } from "../../store";
import { ChatWindow } from "../ChatWindow";
import { Background } from "./Background";
import { Board } from "./Board";
import { Cells } from "./Cells";
import styles from "./GameRoom.module.scss";
import { GameUI } from "./GameUI";

interface GameRoomProps {
  onNotLoggedIn?: () => void;
}

export function GameRoom(props: GameRoomProps) {
  const { onNotLoggedIn } = props;
  const { connected } = useSocketStore();

  React.useEffect(() => {
    if (!connected) onNotLoggedIn?.();
  }, [connected]);

  if (!connected) return null;

  return (
    <div className={styles.gameRoom}>
      <Background />
      <Board>
        <Cells />
      </Board>
      <GameUI />
      <ChatWindow />
    </div>
  );
}
