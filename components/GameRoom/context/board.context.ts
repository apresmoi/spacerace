import { createContext, Dispatch, SetStateAction } from 'react';

export interface Cordinates {
  x: number;
  y: number;
}
export interface BoardType extends Cordinates {
  type: string;
}
export interface BoardPlayer extends Cordinates {
  name: string;
}

export interface Board {
  width: number;
  height: number;
  players: BoardPlayer[];
  effects: BoardType[];
  blocks: BoardType[];
}

const boardDefault: Board = {
  width: 0,
  height: 0,
  players: [],
  effects: [],
  blocks: [],
};

export const BoardContext = createContext<{ board: Board; setBoard: Dispatch<SetStateAction<Board>> }>({
  board: boardDefault,
  setBoard: () => {},
});
