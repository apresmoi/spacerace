import React from "react";
import { ICell, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";

const getBlock = (room: IRoom, x: number, y: number) => {
  return room.cells.find((row) => row.x === x && row.y === y);
};

const getColor = (block?: ICell) => {
  if (!block) return "black";
  switch (block.type) {
    case "space":
      return "gray";
    case "wall":
    default:
      return "green";
  }
};

export function Cells() {
  const { room } = useGame();
  if (!room) return null;

  const { width, height } = room;

  return (
    <>
      {new Array(width).fill(0).map((_, x) =>
        new Array(height).fill(0).map((_, y) => (
          <div
            key={`${x}-${y}`}
            // onClick={() => playerMovement(x, y)}
            style={{
              gridArea: `cell${x}${y}`,
              background: getColor(getBlock(room, x, y)),
              height: "100%",
              width: "100%",
              border: `1px solid black`,
            }}
          >
            {/* {getPlayer(x, y) && <div>{getPlayer(x, y)?.name}</div>} */}
          </div>
        ))
      )}
    </>
  );
}
