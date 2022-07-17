import React from "react";
import styles from "./ButtonCreateRoom.module.scss";

interface ButtonCreateRoomProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  disabled?: boolean;
}

export const ButtonCreateRoom = (props: ButtonCreateRoomProps) => {
  const { onClick, text, disabled } = props;

  return (
    <button
      className={styles.button}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};
