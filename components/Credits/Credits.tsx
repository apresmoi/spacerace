import React from "react";
import { Background } from "../Background";
import { LeniolabsLogo } from "../LeniolabsLogo";
import { StarsBackground } from "../StarsBackground";
import styles from "./Credits.module.scss";
import { data } from "./utils";
import { SpaceShip, Buildings } from "../Icon";

export const CreditsComponent = () => {
  return (
    <>
      <Background />
      <StarsBackground />
      <div className={styles.creditsContainer}>
        <h1 className={styles.bigTitle}>CREDITS</h1>
        {data.map((dat) => (
        <div className={styles.container}>
            <div className={styles.containerTitles}>
            <h2 className={styles.mediumTitle}>{dat.left}</h2>
            </div>
            <div className={styles.namesContainer}>
              {dat.right.map((name) => (
                <p className={styles.names}>{name}</p>
              ))}
            </div>
        </div>
        
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "0", right: "20px",zIndex:4 }}>
        <Buildings />
      </div>
      <div style={{ position: "absolute", top: "200px", left: "100px", zIndex:4 }}>
        <SpaceShip />
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
        <LeniolabsLogo />
      </div>
    </>
  );
};
