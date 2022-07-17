import React from 'react';
import styles from './ButtonCreateRoom.module.scss';

interface ButtonCreateRoomProps {
  onClick?: () => void;
}

export const ButtonCreateRoom = (props:ButtonCreateRoomProps) => {
  const { onClick } = props;
  return (
    <button className={styles.button} onClick={onClick}>
      <span>Create New Room</span>
    </button>
  );
};
