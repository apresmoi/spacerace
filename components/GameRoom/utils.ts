import { ICell, IPosition, IRoom } from "../../socket/types";

export function getBlockId(x: number, y: number) {
  return `cell${x < 10 ? "0" + x : x}${y < 10 ? "0" + y : y}`;
}

export const getRoomCell = (room: IRoom, x: number, y: number) => {
  return room.cells.find((row) => row.x === x && row.y === y);
};

export const getCellColor = (cell?: ICell) => {
  if (!cell) return "transparent";
  switch (cell.type) {
    case "START":
    case "END":
      return "#FF6B00";
    case "KUIPER":
      return "#563EB2";
    case "METEOR":
      return "#3A4390";
    case "NEUTRAL":
      return "#63A5B7";
    case "SATURN":
      return "#4E66ED";
    case "SUPERNOVAE":
      return "#B4C4FA";
    case "DROP_ITEM":
      return "#FA3757"
  }
};

export function findCellByPosition(cells: IPosition[], position: IPosition) {
  return cells.find((cell) => cell.x === position.x && cell.y === position.y);
}

export const getPosibleMovements = (
  cells: IPosition[],
  prevPosition: IPosition,
  currentPosition: IPosition,
  steps: number
): IPosition[] => {
  if (!findCellByPosition(cells, currentPosition)) {
    return [];
  }

  if (!steps) {
    return [currentPosition];
  }

  let moves: IPosition[] = [];

  //Sino exploro las 4 posibilidades
  if (prevPosition.x !== currentPosition.x + 1) {
    moves = [
      ...moves,
      ...getPosibleMovements(
        cells,
        currentPosition,
        { ...currentPosition, x: currentPosition.x + 1 },
        steps - 1
      ),
    ];
  }

  if (prevPosition.x !== currentPosition.x - 1) {
    moves = [
      ...moves,
      ...getPosibleMovements(
        cells,
        currentPosition,
        { ...currentPosition, x: currentPosition.x - 1 },
        steps - 1
      ),
    ];
  }

  if (prevPosition.y !== currentPosition.y + 1) {
    moves = [
      ...moves,
      ...getPosibleMovements(
        cells,
        currentPosition,
        { ...currentPosition, y: currentPosition.y + 1 },
        steps - 1
      ),
    ];
  }

  if (prevPosition.y !== currentPosition.y - 1) {
    moves = [
      ...moves,
      ...getPosibleMovements(
        cells,
        currentPosition,
        { ...currentPosition, y: currentPosition.y - 1 },
        steps - 1
      ),
    ];
  }

  return moves;
};
