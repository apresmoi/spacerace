import React from "react";
import { useGame } from "../../store";
import { Player } from "./components/Player";
import { getBlockId } from "./utils";

export function Players() {
  const { room } = useGame();
  if (!room) return null;

  return (
    <>
      {room.players.map((player) => (
        <Player key={getBlockId(player.x, player.y)} player={player} />
      ))}
    </>
  );
}
