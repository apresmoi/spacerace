import React from 'react';
import styles from './Container.module.scss';

export function Container(props: React.PropsWithChildren<{}>) {
  return <div className={styles.container}>{props.children}</div>;
};