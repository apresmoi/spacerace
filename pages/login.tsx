import React from "react";
import { NextPage } from "next";
import { Container } from "../components/layout/Container";
import Image from "next/image";
import styles from '../styles/Login.module.scss';
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [name, setName] = React.useState<string>('');
  const router = useRouter();

  const handleOnChangeName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleOnClick = React.useCallback(() => {
    if (name) router.push('/rooms');
  }, [name, router]);

  return (
    <Container>
      <div className={styles.login}>
        <div className={styles.content}>
          <Image src="https://via.placeholder.com/287x36.png" height={36} width={287} alt="instructions" />
          <h1 className={styles.title}>Choose your name</h1>
          <input
            className={styles.input}
            type="text"
            placeholder="Choose your name!"
            onChange={handleOnChangeName}
            value={name}
            required
          />
          <button className={styles.button} onClick={handleOnClick}>Find a room</button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
