import React from 'react';
import { Logo } from '../Icon/Logo';
import style from './LeniolabsLogo.module.scss';

export const LeniolabsLogo = () => {
  return (
    <div className={style.leniolabsLogo}>
      <Logo />
    </div>
  );
};

export default LeniolabsLogo;
