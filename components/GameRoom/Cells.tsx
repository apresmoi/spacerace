import React from "react";
import { ICell, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import { Cell } from "./Cell";
import styles from "./GameRoom.module.scss";
import { getBlockId } from "./utils";

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
      {new Array(width)
        .fill(0)
        .map((_, x) =>
          new Array(height)
            .fill(0)
            .map((_, y) => <Cell key={getBlockId(x, y)} x={x} y={y} />)
        )}
    </>
  );
}
