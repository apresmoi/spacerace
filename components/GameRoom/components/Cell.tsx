import React from "react";
import { ICell } from "../../../socket/types";
import { getBlockId, getCellColor } from "../utils";
import styles from "../GameRoom.module.scss";
import { className } from "../../../utils/classnames";
import { CellItem } from "./CellItem";

interface CellProps {
  cell: ICell;
  highlight?: boolean;
  onClick?: (cell: ICell) => void;
  isMyTurn?: boolean;
}

export function Cell(props: CellProps) {
  const { cell, onClick, isMyTurn } = props;

  const handleClick = React.useCallback(() => {
    onClick?.(cell);
  }, [onClick, cell]);

  const cellText = React.useMemo(() => {
    switch (cell.type) {
      case "END":
        return "END";
      case "START":
        return "START";
      default:
        return "";
    }
  }, [cell]);

  const strokeColor = React.useMemo(() => {
    if (props.highlight) {
      if (isMyTurn) {
        return "#BEED00";
      }
      return "white";
    }
    switch (cell.type) {
      case "END":
      case "START":
        return "#FFCA30";
      default:
        return "transparent";
    }
  }, [cell, props.highlight, isMyTurn]);

  return (
    <div
      className={className(styles.cell, isMyTurn && props.highlight && styles.highlight)}
      style={{
        gridArea: getBlockId(cell.x, cell.y),
      }}
      onClick={handleClick}
    >
      <svg viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.5 49.1195L49.1195 0.5H117.88L166.5 49.1195V117.88L117.88 166.5H49.1195L0.5 117.88V49.1195Z"
          fill={getCellColor(cell)}
          stroke={strokeColor}
          strokeWidth={18}
        />
        <text fontSize={40} dy={100} dx={82} textAnchor="middle" fill="black">
          {cellText}
        </text>
      </svg>
    </div>
  );
}
