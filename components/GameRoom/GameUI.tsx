import React from "react";
import { useGame } from "../../store";
import { className } from "../../utils/classnames";
import { DiceIcon, RocketIcon } from "../Icon";
import { RocketWithShape } from "../Icon/RocketWithShape";
import StartBackgroundButton from "../Icon/StartBackgroundButton";
import styles from "./GameRoom.module.scss";

export function GameUI() {
  const { room, player, turnPlayer, isMyTurn, tryStart, tryDice, tryMove } =
    useGame();
  if (!room) return null;


  return (
    <div className={styles.gameUI}>
      {/* <div>
        {room.players.map((player) => (
          <div key={player.id}>
            {player.isAdmin ? "(Admin)" : ""} {player.name}
          </div>
        ))}
      </div>
      <div>
        Dice: {room.currentDice?.[0]} / {room.currentDice?.[1]}
      </div> */}
      {isMyTurn && (
        <div className={styles.dice} onClick={() => tryDice()}>
          <div>
            <DiceIcon />
          </div>
          <span>{room.currentDice[0] + room.currentDice[1]}</span>
        </div>
      )}
      {player?.isAdmin && !room.started && (
        <div className={styles.startButton} onClick={() => tryStart()}>
          <StartBackgroundButton />
          <span>Start</span>
        </div>
      )}
      <div className={styles.zones}>
        <div>
          <StartBackgroundButton />
          <span>KUIPER ZONE</span>
        </div>
        <div>
          <StartBackgroundButton />
          <span>METEOR ZONE</span>
        </div>
        <div>
          <StartBackgroundButton />
          <span>SATURN ZONE</span>
        </div>
        <div>
          <StartBackgroundButton />
          <span>SUPERNOVAE ZONE</span>
        </div>
      </div>
      <div className={styles.players}>
        {room.players.map((player, i) => (
          <div key={player.id} className={styles[`player${i + 1}`]}>
            <RocketIcon foundParts={player.inventory} />
            <div className={styles.playerName}>
              <StartBackgroundButton />
              <span>
                {player.name}
                {player.isAdmin ? " (Admin)" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
