import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  return <button className={styles.button}>{text}</button>;
};
