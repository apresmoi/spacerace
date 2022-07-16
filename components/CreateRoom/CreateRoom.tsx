import React from "react";
import { useAppStore } from "../../store";
import { useSocketStore } from "../../store/SocketStore";
import styles from "./CreateRoom.module.scss";

export function CreateRoom() {
  const { createRoom, name } = useAppStore();
  const { connect } = useSocketStore();

  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setRoomName(value);
    },
    []
  );

  const handleRoomCreate = React.useCallback(() => {
    createRoom(roomName).then((room) => {
      if (room) connect(room.id, name);
    });
  }, [roomName, createRoom, name]);

  return (
    <div className={styles.createRoom}>
      <h1 className={styles.label}>New room name</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Room Name"
        onChange={handleRoomNameChange}
        value={roomName}
        required
        minLength={6}
      />
      <button
        className={styles.button}
        disabled={roomName.length < 6}
        onClick={handleRoomCreate}
      >
        Create Room!
      </button>
    </div>
  );
}
