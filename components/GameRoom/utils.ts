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
    case "space":
      return "gray";
    case "wall":
    default:
      return "green";
  }
};

export function findCellByPosition(cells: ICell[], position: IPosition) {
  return cells.find((cell) => cell.x === position.x && cell.y === position.y);
}

export const getPosibleMovements = (
  cells: ICell[],
  prevPosition: IPosition,
  currentPosition: IPosition,
  steps: number
): IPosition[] => {
  if (!findCellByPosition(cells, currentPosition)) {
    console.log("cell exists");
    return [];
  }

  if (!steps) return [currentPosition];

  let moves: IPosition[] = [];

  //Sino exploro las 4 posibilidades
  if (prevPosition.x != currentPosition.x + 1) {
    
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

  if (prevPosition.x != currentPosition.x - 1) {
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

  if (prevPosition.y != currentPosition.y + 1) {
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

  if (prevPosition.y != currentPosition.y - 1) {
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
