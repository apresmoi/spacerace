import React from "react";
import { useGame, useSocketStore } from "../../store";
import { ChatWindow } from "../ChatWindow";
import { Background } from "../Background";
import { Board } from "./Board";
import { Cells } from "./Cells";
import styles from "./GameRoom.module.scss";
import { GameUI } from "./GameUI";
import { Players } from "./Players";
import { StarsBackground } from "../StarsBackground";
import { Header } from "./components/Header";
import { DetailsBackground } from "../DetailsBackground";
import { RocketIcon } from "../Icon";
import { Rocket } from "../Rocket";

interface GameRoomProps {
  onNotLoggedIn?: () => void;
}

export function GameRoom(props: GameRoomProps) {
  const { onNotLoggedIn } = props;
  const { connected } = useSocketStore();

  React.useEffect(() => {
    if (!connected) onNotLoggedIn?.();
  }, [connected]);

  if (!connected) return null;

  return (
    <div className={styles.gameRoom}>
      <Background />
      <StarsBackground />
      <DetailsBackground />
      <Board>
        <Cells />
        <Players />
        <Rocket />
      </Board>
      <Header />
      <GameUI />
      <ChatWindow />
    </div>
  );
}
