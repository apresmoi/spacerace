import React from "react";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";

export function GameUI() {
  const { room, tryStart, tryDice, tryMove } = useGame();
  if (!room) return null;

  return (
    <div className={styles.gameUI}>
      <button onClick={() => tryStart()}>Start Game</button>
      <button onClick={() => tryDice()}>Roll dice</button>
      <button onClick={() => tryMove({ x: 5, y: 1 })}>Player Move</button>
    </div>
  );
}
