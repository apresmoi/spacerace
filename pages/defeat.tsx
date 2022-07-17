import React, { useState } from "react";
import { NextPage } from "next";
import styles from "../styles/ContinueScreens.module.scss";
import { useRouter } from "next/router";
import { Background } from "../components/Background";
import { StarsBackground } from "../components/StarsBackground";
import { ButtonBool } from "../components/ButtonBool";
import { LeniolabsLogo } from "../components/LeniolabsLogo";
import { useGame } from "../store";

const DefeatScreen: NextPage = () => {
  const { turnPlayer } = useGame();
  const router = useRouter();
  const handleOnClick = (bool: boolean) => {
    if (bool) {
      router.push("/rooms");
    } else {
      router.push("/credits");
    }
  };
  return (
    <>
      <Background />
      <StarsBackground />
      <div className={styles.content}>
        <div className="wrapper">
          <div>
            <span>
              OH NO!{" "}
              <span style={{ color: "white" }}>
                <>{turnPlayer || "Player1"} WON</>
              </span>{" "}
              <br />
              YOU NEED TO BE FASTER <br />
              NEXT TIME <br />
              PLAY AGAIN?
            </span>
          </div>
          <div style={{ zIndex: "1", marginTop: "1rem" }}>
            <ButtonBool onClick={() => handleOnClick(true)} bool />
            <ButtonBool onClick={() => handleOnClick(false)} bool={false} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <LeniolabsLogo />
        </div>
      </div>
    </>
  );
};

export default DefeatScreen;
