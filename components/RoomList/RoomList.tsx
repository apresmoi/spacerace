import React from "react";
import { useAppStore } from "../../store";
import {
  useRoomPlayerMessageSend,
  useSocketRoomPlayerMessage,
  useSocketStore,
} from "../../store/SocketStore";
import styles from "./RoomList.module.scss";

export function RoomList() {
  const { name, updateRooms, rooms, createRoom } = useAppStore();
  const { connect } = useSocketStore();

  const handleRoomClick = React.useCallback(
    (id: string) => {
      return () => {
        connect(id, name);
      };
    },
    [name, connect]
  );

  React.useEffect(() => {
    updateRooms();
  }, [updateRooms]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateRooms();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [updateRooms]);

  return (
    <div className={styles.roomList}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} onClick={handleRoomClick(room.id)}>
              <td>{room.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
