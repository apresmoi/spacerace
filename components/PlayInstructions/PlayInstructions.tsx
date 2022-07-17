import { useRouter } from "next/router";
import React from "react";
import { Background } from "../Background";
import { GoButton } from "../GoButton";
import { Instruction1 } from "../Icon/Instruction1";
import { Instruction2 } from "../Icon/instruction2";
import { Instructions3 } from "../Icon/instruction3";
import { LeniolabsLogo } from "../LeniolabsLogo";
import { StarsBackground } from "../StarsBackground";
import styles from "./PlayInstructions.module.scss";

export function PlayInstructions() {
  const router = useRouter();

  const instructions = [
    {
      text: "The goal is to find 4 parts of the spaceship that are dispersed along the board in order to take off and go back to Earth.",
      img: Instruction1,
      id: "instruction1",
    },
    {
      text: "The players take turns to roll the dice. The board is divided into 4 zones with different colors. In each one of them the player will be able to obtain a part of the spaceship.",
      img: Instruction2,
      id: "instruction2",
    },
    {
      text: "The black tiles are black holes. If a player lands there, he will be sent to the start.",
      img: Instructions3,
      id: "instruction3",
    },
  ];
  const Instruction = (props: {
    text: string;
    img: React.FunctionComponent;
  }) => {
    const InstructionImg = props.img;
    return (
      <div className={styles.instruction}>
        <div className={styles.img}>
          <InstructionImg />
        </div>
        <div className={styles.text}>
          <p>{props.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.playInstructions}>
      <Background />
      <StarsBackground />
      <div className={styles.title}>SPACE RACE</div>
      <div className={styles.instructions}>
        {instructions.map((int) => (
          <Instruction key={int.id} text={int.text} img={int.img} />
        ))}
      </div>
      <div className={styles.rocket}>
        <p className={styles.text}>
          Once the player has finished collecting the four pieces, he must land
          on the central light-blue tile in order to win the game. The first
          player to do this, will win the game.
        </p>
      </div>
      <div className={styles.logo}>
        <LeniolabsLogo />
      </div>
      <div className={styles.button}>
        <GoButton text="Go!" onClick={() => router.push("/login")} />
      </div>
    </div>
  );
}
