import React from "react";
import { ICell, IPosition, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import { Cell } from "./components/Cell";
import { getBlockId, getPosibleMovements } from "./utils";

export function Cells() {
  const { room, player, isMyTurn } = useGame();
  if (!room) return null;

  const possibleBlocks = React.useMemo(() => {
    if (isMyTurn && player) {
      const steps = room.currentDice.reduce((r, x) => r + x, 0);
      return getPosibleMovements(
        room.cells,
        { x: player.x, y: player.y },
        { x: player.x, y: player.y },
        steps
      );
    }
    return [];
  }, [isMyTurn, player]);

  console.log({ possibleBlocks });

  return (
    <>
      {room.cells.map((cell) => (
        <Cell key={getBlockId(cell.x, cell.y)} cell={cell} />
      ))}
    </>
  );
}
