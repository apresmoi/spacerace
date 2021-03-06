import React from "react";
import { IItem } from "../../socket/types";
import { useGame } from "../../store";
import { className } from "../../utils/classnames";
import { DiceIcon, RocketIcon } from "../Icon";
import StartBackgroundButton from "../Icon/StartBackgroundButton";
import styles from "./GameRoom.module.scss";

export function GameUI() {
  const { room, player, turnPlayer, isMyTurn, tryStart, tryDice, tryDropItem } =
    useGame();

  const handleDropItem = React.useCallback(
    (targetPlayerID: string) => {
      return (item: IItem) => {
        if (isMyTurn && player && player.id !== targetPlayerID)
          tryDropItem(targetPlayerID, item);
      };
    },
    [tryDropItem, player]
  );

  if (!room) return null;
  return (
    <div className={styles.gameUI}>
      {room.turnStage !== "WAITING_FOR_START" && (
        <div
          className={className(
            styles.dice,
            room.turnStage === "WAITING_FOR_ROLL" &&
              isMyTurn &&
              styles.diceMyTurn
          )}
          onClick={() => (isMyTurn ? tryDice() : null)}
        >
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
          <div
            key={player.id}
            className={className(
              styles[`player${i + 1}`],
              turnPlayer?.id === player.id && styles.playerHighlight
            )}
          >
            <RocketIcon
              foundParts={player.inventory}
              hoverable={
                room.turnStage === "WAITING_FOR_DROP_ITEM" &&
                isMyTurn &&
                turnPlayer?.id !== player.id
              }
              onClick={handleDropItem(player.id)}
            />
            <div className={styles.playerName}>
              <StartBackgroundButton highlight={turnPlayer?.id === player.id} />
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
