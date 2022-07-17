import React from "react";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";
import { getBlockId } from "./utils";

export function Board(props: React.PropsWithChildren<{}>) {
  const { room } = useGame();

  const width = room?.width;
  const height = room?.height;

  const gridTemplateAreas = React.useMemo(() => {
    return new Array(height)
      .fill(0)
      .map((_, y) => {
        return (
          '"' +
          new Array(width)
            .fill(0)
            .map((_, x) => {
              return getBlockId(x, y);
            })
            .join(" ") +
          '"'
        );
      })
      .join("\n");
  }, [width, height]);

  const gridTemplateColumns = React.useMemo(() => {
    return new Array(width)
      .fill(0)
      .map((_, y) => "1fr")
      .join(" ");
  }, [width]);

  const gridTemplateRows = React.useMemo(() => {
    return new Array(height)
      .fill(0)
      .map((_, y) => "1fr")
      .join(" ");
  }, [height]);

  if (!room) return null;

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateAreas,
        gridTemplateRows,
        gridTemplateColumns,
        width: `${(width || 0) * 3}vw`,
        height: `${(height || 0) * 3}vw`,
      }}
    >
      {props.children}
    </div>
  );
}
