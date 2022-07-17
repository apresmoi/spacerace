import React from "react";
import styles from "./input.module.scss";

interface inputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  minLength?: number;
}

export const Input = (props: inputProps) => {
  const { onChange, value, placeholder } = props;
  return (
    <input
      className={styles.input}
      maxLength={15}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};
