import React from "react";
import { useAppStore } from "../../store";
import { useSocketStore } from "../../store/SocketStore";
import { ButtonCreateRoom } from "../ButtonCreateRoom";
import { Input } from "../Input";
import styles from "./CreateRoom.module.scss";

interface CreateRoomProps {
  onCreate?: () => {};
}

export function CreateRoom(props: CreateRoomProps) {
  const { onCreate } = props;
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
      if (room) {
        connect(room.id, name);
        setTimeout(() => {
          onCreate?.();
        }, 100);
      }
    });
  }, [roomName, createRoom, name, onCreate]);

  return (
    <div className={styles.createRoom}>
      <Input
        onChange={handleRoomNameChange}
        placeholder="Room Name"
        value={roomName}
        minLength={6}
      />
      <ButtonCreateRoom text="Create a room" onClick={handleRoomCreate} disabled={roomName.length < 6}/>
    </div>
  );
}
