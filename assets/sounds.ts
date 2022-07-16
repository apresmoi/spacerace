import { useSettings } from "@store";
import debounce from "lodash.debounce";
import * as React from "react";

const Ambient = new Audio("sounds/ambient.mp3");
const Moving = new Audio("sounds/moving.mp3");
const Turnon = new Audio("sounds/turnon.mp3");
const Turnoff = new Audio("sounds/turnoff.mp3");
const PlayerJoin = new Audio("sounds/join.ogg");
const PlayerLeave = new Audio("sounds/leave.ogg");
const LightsMoving = new Audio("sounds/lightsmoving.mp3");
const ChangeDeck = new Audio("sounds/changedeck.mp3");

const sounds = {
	Ambient,
	Moving,
	Turnon,
	Turnoff,
	PlayerJoin,
	PlayerLeave,
	LightsMoving,
	ChangeDeck,
};

interface AudioHelper {
	play: (...args: any) => Promise<void>;
	stop: () => void;
}

export const useSound = (
	name: keyof typeof sounds,
	options?: {
		loop?: boolean;
		volume?: number;
	}
): AudioHelper | undefined => {
	const { sound: soundActivated } = useSettings();

	return React.useMemo(() => {
		//@ts-ignore
		const sound: HTMLAudioElement | undefined = sounds[name];
		if (sound)
			return {
				play: () => {
					if (soundActivated) {
						sound.loop = options?.loop || false;
						sound.volume = options?.volume || 1;
						return sound.play();
					}
					return new Promise(() => {});
				},
				stop: () => {
					sound.pause();
				},
			};
	}, [name, options, soundActivated]);
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
