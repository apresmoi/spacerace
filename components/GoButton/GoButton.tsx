import React from 'react';
import styles from './GoButton.module.scss';

interface GoButtonProps {
  onClick?: () => void;
  text?: string
}

export const GoButton = (props: GoButtonProps) => {
  const { onClick, text } = props;
  return (
    <button className={styles.button} onClick={onClick}>
      <span>{!text ? "Go!" : text}</span>
    </button>
  );
};
