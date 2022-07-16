import React from "react";
import { useGame } from "../../store";
import { Background } from "./Background";
import { Board } from "./Board";
import { Cells } from "./Cells";
import styles from "./GameRoom.module.scss";
import { GameUI } from "./GameUI";

export function GameRoom() {
  const { room } = useGame();
  if (!room) return null;

  return (
    <div className={styles.gameRoom}>
      <Background />
      <Board>
        <Cells />
      </Board>
      <GameUI />
    </div>
  );
}
