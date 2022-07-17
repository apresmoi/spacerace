import { url } from "inspector";
import React from "react";
import styles from "./ButtonBool.module.scss";

interface ButtonBoolProps {
  bool: boolean;
  onClick?: () => void;
}

export const ButtonBool = (props: ButtonBoolProps) => {
  const { onClick, bool } = props;
  return (
    <button
      className={`${bool ? styles.true : styles.false}`}
      onClick={onClick}
    >
      <span>{bool ? "YES" : "NO"}</span>
    </button>
  );
};
