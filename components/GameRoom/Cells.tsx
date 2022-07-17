import React from "react";
import { ICell, IPosition, IRoom } from "../../socket/types";
import { useGame } from "../../store";
import { Cell } from "./components/Cell";
import { CellItem } from "./components/CellItem";
import { findCellByPosition, getBlockId, getPosibleMovements } from "./utils";

export function Cells() {
  const { room, turnPlayer, isMyTurn, tryMove } = useGame();

  const possibleBlocks = React.useMemo(() => {
    if (room && turnPlayer) {
      const steps = room.currentDice.reduce((r, x) => r + x, 0);
      return getPosibleMovements(
        room.cells,
        { x: turnPlayer.x, y: turnPlayer.y },
        { x: turnPlayer.x, y: turnPlayer.y },
        steps
      );
    }
    return [];
  }, [turnPlayer, room?.currentDice]);

  const isBlockHighlighted = React.useCallback(
    (cell: ICell) => {
      return (
        room &&
        room.turnStage === "WAITING_FOR_MOVE" &&
        !!findCellByPosition(possibleBlocks, {
          x: cell.x,
          y: cell.y,
        })
      );
    },
    [room?.turnStage, possibleBlocks]
  );

  const handleCellClick = React.useCallback(
    (cell: ICell) => {
      if (isBlockHighlighted(cell)) tryMove({ x: cell.x, y: cell.y });
    },
    [tryMove, isBlockHighlighted]
  );

  if (!room) return null;

  return (
    <>
      {room.cells.map((cell) => (
        <Cell
          key={getBlockId(cell.x, cell.y)}
          cell={cell}
          highlight={isBlockHighlighted(cell)}
          onClick={handleCellClick}
          isMyTurn={isMyTurn}
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
