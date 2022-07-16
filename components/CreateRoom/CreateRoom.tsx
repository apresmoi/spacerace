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
      <label>New room name</label>
      <input value={roomName} onChange={handleRoomNameChange} />
      <button onClick={handleRoomCreate}>Create</button>
    </div>
  );
}
