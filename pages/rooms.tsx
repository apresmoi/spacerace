import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Rooms.module.scss";
import { useRouter } from "next/router";
import { RoomList } from "../components/RoomList";
import { Background } from "../components/Background";
import { StarsBackground } from "../components//StarsBackground"

const Rooms: NextPage = () => {
  const router = useRouter();

  const handleCreateRoom = React.useCallback(() => {
    router.push("/createNewRoom");
  }, []);

  return (
    <div className={styles.container}>
      <Background />
      <StarsBackground/>
      <div className={styles.rooms}>
        <div className={styles.content}>
          <h1 className={styles.title}>Choose a room</h1>
          <RoomList onJoin={() => router.push("/play")} />
          <p>or</p>
          <button className={styles.button} onClick={handleCreateRoom}>
            Create New Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
