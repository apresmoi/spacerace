import React from "react";
import { useAppStore } from "../../store";
import { useSocketStore } from "../../store/SocketStore";
import styles from "./RoomList.module.scss";
import Image from "next/image";
import roomTable from "./roomTable.png";

interface RoomListProps {
  onJoin?: () => {};
}

export function RoomList(props: RoomListProps) {
  const { onJoin } = props;
  const { name, updateRooms, rooms, createRoom } = useAppStore();
  const { connect } = useSocketStore();

  const handleRoomClick = React.useCallback(
    (id: string) => {
      return () => {
        connect(id, name);
        onJoin?.();
      };
    },
    [name, connect, onJoin]
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Room</th>
            <th className={styles.tableHeader}>Players</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              onClick={!room.started ? handleRoomClick(room.id) : undefined}
            >
              <td>{room.name}</td>
              <td>{room.playerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
