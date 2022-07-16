import React from "react";
import { ICell, IRoom } from "../../socket/types";
import { useGame } from "../../store";
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
        background: getColor(getBlock(room, x, y)),
        border: `1px solid black`,
      }}
    >
      {/* {getPlayer(x, y) && <div>{getPlayer(x, y)?.name}</div>} */}
    </div>
  );
}
