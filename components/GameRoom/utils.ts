import { ICell, IRoom } from "../../socket/types";

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
