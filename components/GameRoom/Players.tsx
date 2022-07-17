import React from "react";
import { useGame } from "../../store";
import { Player } from "./components/Player";
import { getBlockId } from "./utils";

export function Players() {
  const { room, turnPlayer } = useGame();
  if (!room) return null;

console.log(room.players)

  return (
    <>
      {room.players.map((player) => (
        <Player
          key={player.id}
          data-id={player.id}
          player={player}
          highlight={turnPlayer?.id === player.id}
        />
      ))}
    </>
  );
}
