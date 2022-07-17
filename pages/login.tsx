import React from "react";
import { NextPage } from "next";
import styles from "../styles/Login.module.scss";
import { useRouter } from "next/router";
import { useAppStore } from "../store";
import { Background } from "../components/Background";
import { StarsBackground } from "../components/StarsBackground";
import { ButtonCreateRoom } from "../components/ButtonCreateRoom";
import { LeniolabsLogo } from "../components/LeniolabsLogo";
import { Input } from "../components/Input";

const Login: NextPage = () => {
  const { name, changeName } = useAppStore();

  const router = useRouter();

  const handleOnChangeName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeName(e.target.value);
    },
    []
  );

  const handleOnClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (name) router.push("/rooms");
    },
    [name, router]
  );

  return (
    <form className={styles.login}>
      <Background />
      <StarsBackground />
      <div className={styles.content}>
        <h1 className={styles.title}>Choose your name</h1>
        <Input
          onChange={handleOnChangeName}
          placeholder="Choose your name!"
          value={name}
        />
        <ButtonCreateRoom text="Find New Room" onClick={handleOnClick} />
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
        <LeniolabsLogo />
      </div>
    </form>
  );
};

export default Login;
