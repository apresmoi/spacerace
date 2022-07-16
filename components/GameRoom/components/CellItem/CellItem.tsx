import React from "react";
import { ICell } from "../../../../socket/types";
import { getBlockId } from "../../utils";
import styles from "../../GameRoom.module.scss";
import { className } from "../../../../utils/classnames";
import { RocketBody } from "./RocketBody";
import { RocketFins } from "./RocketFins";
import { RocketFire } from "./RocketFire";
import { RocketTip } from "./RocketTip";

interface CellItemProps {
  cell: ICell;
}

export function CellItem(props: CellItemProps) {
  const { cell } = props;

  return (
    <div
      className={className(styles.cellItem)}
      style={{
        gridArea: getBlockId(cell.x, cell.y),
        pointerEvents: 'none'
      }}
    >
      {cell.item === "ROCKET_BODY" && <RocketBody />}
      {cell.item === "ROCKET_FINS" && <RocketFins />}
      {cell.item === "ROCKET_FIRE" && <RocketFire />}
      {cell.item === "ROCKET_TIP" && <RocketTip />}
    </div>
  );
}
