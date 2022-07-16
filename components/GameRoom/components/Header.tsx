import React from "react";
import { HeaderIcon } from "../../Icon";
import styles from "../GameRoom.module.scss";
import { className } from "../../../utils/classnames";
export const Header = () => {
  return (
    <div className={className(styles.header)}>
      <HeaderIcon />
    </div>
  );
};
