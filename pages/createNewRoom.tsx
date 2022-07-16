import React from "react";
import { NextPage } from "next";
import { Container } from "../components/layout/Container";
import Image from "next/image";
import styles from "../styles/createNewRoom.module.scss";
import { useRouter } from "next/router";
import { CreateRoom } from "../components/CreateRoom";

const CreateNewRoom: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <div className={styles.createNewRoom}>
        <div className={styles.createRoomContent}>
          <Image
            src="https://via.placeholder.com/287x36.png"
            height={36}
            width={287}
            alt="instructions3"
          />
          <h1 className={styles.title}>
            Choose a room name <br />
            <small className={styles.small}>(min 6 characters)</small>
          </h1>
          <CreateRoom onCreate={() => router.push("/play")} />
        </div>
      </div>
    </Container>
  );
};

export default CreateNewRoom;
