import React from "react";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";

export function GameUI() {
  const { room, player, turnPlayer, isMyTurn, tryStart, tryDice, tryMove } =
    useGame();
  if (!room) return null;

  return (
    <div className={styles.gameUI}>
      {player?.isAdmin && (
        <button disabled={room.started} onClick={() => tryStart()}>
          Start Game
        </button>
      )}
      {isMyTurn && (
        <>
          <button onClick={() => tryDice()}>Roll dice</button>
        </>
      )}
      <div>
        {room.players.map((player) => (
          <div key={player.id}>
            {player.isAdmin ? "(Admin)" : ""} {player.name}
          </div>
        ))}
      </div>
      <div>
        Dice: {room.currentDice?.[0]} / {room.currentDice?.[1]}
      </div>
    </div>
  );
}
