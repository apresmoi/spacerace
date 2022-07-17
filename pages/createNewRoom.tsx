import React from "react";
import { NextPage } from "next";
import { Container } from "../components/layout/Container";
import Image from "next/image";
import styles from "../styles/createNewRoom.module.scss";
import { useRouter } from "next/router";
import { CreateRoom } from "../components/CreateRoom";
import { LeniolabsLogo } from "../components/LeniolabsLogo";
import { StarsBackground } from "../components/StarsBackground";
import { Background } from "../components/Background";

const CreateNewRoom: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.createNewRoom}>
      <Background />
      <StarsBackground />
      <div className={styles.createRoomContent}>
        <h1 className={styles.title}>
          Choose a room name <br />
          <small className={styles.small}>(min 6 characters)</small>
        </h1>
        <CreateRoom onCreate={() => router.push("/play")} />
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
        <LeniolabsLogo />
      </div>
    </div>
  );
};

export default CreateNewRoom;
