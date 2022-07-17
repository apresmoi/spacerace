import debounce from "lodash.debounce";
import * as React from "react";
import { useSettings } from "../store";
interface AudioHelper {
  play: (...args: any) => Promise<void>;
  stop: () => void;
  isPlaying: boolean;
}

export const useSound = (
  name: keyof typeof sounds,
  options?: {
    loop?: boolean;
    volume?: number;
  }
): AudioHelper | undefined => {
  const { sound: soundActivated } = useSettings();

  const sounds = React.useMemo(() => {
    if (typeof window === "undefined") return {};

    const btnClick = new Audio("sounds/btn-click.mp3");
    const creditsMusic = new Audio("sounds/credits-music.mp3");
    const bgMusic = new Audio("sounds/bg-music.mp3");
    const kiperZone = new Audio("sounds/kiper-zone.mp3");
    const meteorZone = new Audio("sounds/meteor-zone.mp3");
    const saturnZone = new Audio("sounds/saturn-zone.mp3");
    const swooshMovement = new Audio("sounds/swoosh-movement.mp3");
    const swooshRocket = new Audio("sounds/swoosh-plus-rocket.mp3");
    const superNovaZone = new Audio("sounds/supernova-zone.mp3");

    return {
      btnClick,
      creditsMusic,
      bgMusic,
      kiperZone,
      meteorZone,
      saturnZone,
      swooshMovement,
      swooshRocket,
      superNovaZone,
    };
  }, []);

  return React.useMemo(() => {
    //@ts-ignore
    const sound: HTMLAudioElement | undefined = sounds[name];
    let isPlaying = false;

    if (sound)
    sound.volume = 0.5
      return {
        isPlaying,
        play: (stopAt: number = null) => {
          if (soundActivated) {
            sound.loop = options?.loop || false;
            sound.volume = options?.volume || 1;
            isPlaying = true;
            sound.play();

            if (stopAt != null) {
              setTimeout(() => {
                sound.pause();
              }, stopAt);
            }
          }
          return new Promise(() => {});
        },
        stop: () => {
          sound.pause();
          isPlaying = false;
        },
      };
  }, [name, options, sounds, soundActivated]);
};

export const useRandomSound = (
  sounds: HTMLAudioElement[],
  options?: {
    loop?: boolean;
    volume?: number;
  }
): Pick<AudioHelper, "play"> => {
  const { sound: soundActivated } = useSettings();

  return React.useMemo(() => {
    const randomAudio = () => {
      const rnd = Math.floor(Math.random() * sounds.length);
      return sounds[rnd];
    };

    return {
      play: () => {
        if (soundActivated) {
          const audio = randomAudio();
          audio.loop = options?.loop || false;
          audio.volume = options?.volume || 1;
          return audio.play();
        }
        return new Promise(() => {});
      },
    };
  }, [sounds, options, soundActivated]);
};

export const useKeystrokeSound = (volume: number) => {
  const sounds = React.useMemo(
    () => [
      new Audio("sounds/keystroke1.mp3"),
      new Audio("sounds/keystroke2.mp3"),
      new Audio("sounds/keystroke3.mp3"),
      new Audio("sounds/keystroke4.mp3"),
      new Audio("sounds/keystroke5.mp3"),
      new Audio("sounds/keystroke6.mp3"),
    ],
    []
  );
  return useRandomSound(sounds, { volume });
};

export const useDebounceSound = (
  sound: Pick<AudioHelper, "play">
): Pick<AudioHelper, "play"> => {
  const currentId = React.useRef<string | undefined>();
  return React.useMemo(() => {
    const play = debounce((id: string) => {
      if (currentId.current !== id) {
        currentId.current = id;
        return sound.play();
      }
      return null;
    }, 0) as (id: string) => Promise<void>;
    return {
      play,
    };
  }, [sound]);
};

export const useLaserSound = (volume: number) => {
  const sounds = React.useMemo(
    () => [
      new Audio("sounds/laser1.ogg"),
      new Audio("sounds/laser2.ogg"),
      new Audio("sounds/laser3.ogg"),
    ],
    []
  );
  return useDebounceSound(useRandomSound(sounds, { volume }));
};
