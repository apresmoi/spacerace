import React from "react";
import { ICell, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";
import { getBlockId } from "./utils";

const getBlock = (room: IRoom, x: number, y: number) => {
  return room.cells.find((row) => row.x === x && row.y === y);
};

const getColor = (block?: ICell) => {
  if (!block) return "transparent";
  switch (block.type) {
    case "space":
      return "gray";
    case "wall":
    default:
      return "green";
  }
};

interface CellProps {
  x: number;
  y: number;
}

export function Cell(props: CellProps) {
  const { x, y } = props;
  const { room } = useGame();
  if (!room) return null;

  return (
    <div
      style={{
        gridArea: getBlockId(x, y),
      }}
    >
      <svg viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.5 49.1195L49.1195 0.5H117.88L166.5 49.1195V117.88L117.88 166.5H49.1195L0.5 117.88V49.1195Z"
          fill={getColor(getBlock(room, x, y))}
          stroke="#0D141E"
        />
      </svg>
    </div>
  );
}
