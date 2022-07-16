import React from "react";
import { useGame } from "../../store";
import { Background } from "./Background";
import { Cells } from "./Cells";
import styles from "./GameRoom.module.scss";
import { GameUI } from "./GameUI";

export function GameRoom() {
  const { room } = useGame();
  if (!room) return null;

  const { width, height } = room;

  const gridTemplateAreas = React.useMemo(() => {
    return new Array(height)
      .fill(0)
      .map((_, y) => {
        return (
          '"' +
          new Array(width)
            .fill(0)
            .map((_, x) => {
              return `cell${x}${y}`;
            })
            .join(" ") +
          '"'
        );
      })
      .join("\n");
  }, [width, height]);

  return (
    <div
      className={styles.gameRoom}
      style={{
        gridTemplateAreas,
      }}
    >
      <Background />
      <Cells />
      <GameUI />
    </div>
  );
}
