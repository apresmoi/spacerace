import React from "react";
import { useGame } from "../../store";
import styles from "./GameRoom.module.scss";

export function GameUI() {
  const { room, player, turnPlayer, isMyTurn, tryStart, tryDice, tryMove } =
    useGame();
  if (!room || !player || !turnPlayer) return null;

  console.log(player, turnPlayer);

  return (
    <div className={styles.gameUI}>
      {player.isAdmin && <button onClick={() => tryStart()}>Start Game</button>}
      {isMyTurn && (
        <>
          <button onClick={() => tryDice()}>Roll dice</button>
          <button onClick={() => tryMove({ x: 5, y: 1 })}>Player Move</button>
        </>
      )}
      <div>
        {room.players.map((player) => (
          <div key={player.id}>
            {player.isAdmin ? "(Admin)" : ""} {player.name}
          </div>
        ))}
      </div>
    </div>
  );
}
