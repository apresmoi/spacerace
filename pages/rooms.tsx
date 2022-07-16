import React from "react";
import { NextPage } from "next";
import { Container } from "../components/layout/Container";
import Image from "next/image";
import styles from "../styles/Rooms.module.scss";
import { useRouter } from "next/router";
import { RoomList } from "../components/RoomList";

const Rooms: NextPage = () => {
  const router = useRouter();

  const handleCreateRoom = React.useCallback(() => {
    router.push("/createNewRoom");
  }, []);

  return (
    <Container>
      <div className={styles.rooms}>
        <div className={styles.content}>
          <Image
            src="https://via.placeholder.com/287x36.png"
            height={36}
            width={287}
            alt="instructions2"
          />
          <h1 className={styles.title}>Choose a room</h1>
          <RoomList />
          <p>or</p>
          <button className={styles.button} onClick={handleCreateRoom}>
            Create New Room
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Rooms;
