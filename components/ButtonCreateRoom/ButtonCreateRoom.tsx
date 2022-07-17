import React from 'react';
import styles from './ButtonCreateRoom.module.scss';

interface ButtonCreateRoomProps {
  onClick?: () => void;
  text?: string;
}

export const ButtonCreateRoom = (props:ButtonCreateRoomProps) => {
  const { onClick,text } = props;
  return (
    <button className={styles.button} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};
