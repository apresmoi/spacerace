import { useRouter } from "next/router";
import * as React from "react";
import { useSound } from "../assets";

export function useMusic() {
    const bgMusic = useSound("bgMusic", { loop: true });
    const creditsMusic = useSound("creditsMusic", { loop: true });
  
    const alreadyPlayedMenuMusic = React.useRef(false);
  
    const location = useRouter();
  
    const playNeededSong = React.useCallback(() => {
      const path = location.pathname;
  
      setTimeout(() => {
        console.log("called with " + path);
  
        if (["/", "/play", "/rooms", "/instructions", "/login", "/createNewRoom"].includes(path)) {
            bgMusic?.play();
        }
  
        if (path === "/credits") {
          bgMusic?.stop();
          creditsMusic?.play();
        }
      }, 10);
    }, [location.pathname, bgMusic, creditsMusic]);
  
    React.useEffect(() => {
      const playMusic = () => {
        if (alreadyPlayedMenuMusic.current) {
          return;
        }
        alreadyPlayedMenuMusic.current = true;
        playNeededSong();
      };
  
      document.addEventListener("click", playMusic);
      return () => {
        document.removeEventListener("click", playMusic);
      };
    }, [location.pathname, playNeededSong]);
  
    const stopAll = React.useCallback(() => {
      creditsMusic?.stop();
      bgMusic?.stop();
    }, [creditsMusic, bgMusic]);
  
    React.useEffect(() => {
      stopAll();
      playNeededSong();
    }, [stopAll, playNeededSong]);
  
    return React.useMemo(() => {
      return {
        bgMusic,
        creditsMusic,
        stopAll,
      };
    }, [bgMusic, creditsMusic, stopAll]);
}
