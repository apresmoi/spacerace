import React from "react";
import { ICell, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import { Cell } from "./components/Cell";
import { getBlockId } from "./utils";

export function Cells() {
  const { room } = useGame();
  if (!room) return null;

  return (
    <>
      {room.cells.map((cell) => (
        <Cell key={getBlockId(cell.x, cell.y)} cell={cell} />
      ))}
    </>
  );
}
