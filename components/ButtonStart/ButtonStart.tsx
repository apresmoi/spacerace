import React from 'react';
import styles from './ButtonStart.module.scss';

interface ButtonStartProps {
  onClick?: () => void;
}

export const ButtonStart = (props: ButtonStartProps) => {
  const { onClick } = props;
  return (
    <button className={styles.button} onClick={onClick}>
      <span>Start</span>
    </button>
  );
};
