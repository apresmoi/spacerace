import React from "react";
import { ICell, IPosition, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import { Cell } from "./components/Cell";
import { CellItem } from "./components/CellItem";
import { findCellByPosition, getBlockId, getPosibleMovements } from "./utils";

export function Cells() {
  const { room, player, isMyTurn, tryMove } = useGame();
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
  }, [isMyTurn, player, room.currentDice]);

  const isBlockHighlighted = React.useCallback(
    (cell: ICell) => {
      return (
        isMyTurn &&
        room.turnStage === "WAITING_FOR_MOVE" &&
        !!findCellByPosition(possibleBlocks, {
          x: cell.x,
          y: cell.y,
        })
      );
    },
    [room.turnStage, possibleBlocks]
  );

  const handleCellClick = React.useCallback(
    (cell: ICell) => {
      if (isBlockHighlighted(cell)) tryMove({ x: cell.x, y: cell.y });
    },
    [tryMove, isBlockHighlighted]
  );

  return (
    <>
      {room.cells.map((cell) => (
        <Cell
          key={getBlockId(cell.x, cell.y)}
          cell={cell}
          highlight={isBlockHighlighted(cell)}
          onClick={handleCellClick}
        />
      ))}
      {room.cells
        .filter((x) => x.item)
        .map((cell) => (
          <CellItem key={getBlockId(cell.x, cell.y)} cell={cell} />
        ))}
    </>
  );
}
