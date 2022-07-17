import React from "react";
import { IItem } from "../../socket/types";
import styles from "./Icon.module.scss";
import { className } from "../../utils/classnames";

interface RocketIconProps {
  foundParts?: IItem[];
  onClick?: (item: IItem) => void;
  hoverable?: boolean;
}

export function RocketIcon(props: React.PropsWithChildren<RocketIconProps>) {
  const { foundParts, onClick, hoverable } = props;

  return (
    <svg
      width="456"
      height="400"
      viewBox="0 0 456 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className(styles.rocketIcon, hoverable && styles.hoverable)}
    >
      <g
        clipPath="url(#clip0_114_1054)"
        transform="translate(192, 290)"
        onClick={
          foundParts?.includes("ROCKET_FIRE")
            ? () => onClick?.("ROCKET_FIRE")
            : undefined
        }
        className={className(
          styles.rocketIconRocketFire,
          foundParts?.includes("ROCKET_FIRE") && hoverable && styles.hoverable
        )}
      >
        <rect width="62" height="97" />
        <g clipPath="url(#clip1_114_1054)">
          <path
            d="M33.7812 5.0685C33.7812 5.0685 -13.2055 22.1563 8.81578 63.3022L15.0042 55.3748C15.0042 55.3748 14.8269 73.0547 28.1413 94.8995C44.072 74.7892 46.1449 57.3117 46.1449 57.3117L51.3137 65.961C78.3124 27.8732 33.7812 5.0685 33.7812 5.0685Z"
            fill={foundParts?.includes("ROCKET_FIRE") ? "#FF8533" : "#B7B7B7"}
          />
          <path
            d="M33.7818 5.06849C33.7818 5.06849 4.49861 15.7276 18.168 41.4228L22.0483 36.4828C22.0483 36.4828 21.9532 47.5067 30.2819 61.1534C40.2167 48.6032 41.506 37.6725 41.506 37.6725L44.7992 43.0627C61.5606 19.3036 33.7818 5.06849 33.7818 5.06849Z"
            fill={foundParts?.includes("ROCKET_FIRE") ? "#FECB2F" : "#8B8B8B"}
          />
        </g>
      </g>
      <g
        onClick={
          foundParts?.includes("ROCKET_BODY")
            ? () => onClick?.("ROCKET_BODY")
            : undefined
        }
        className={className(
          styles.rocketIconRocketBody,
          foundParts?.includes("ROCKET_BODY") && hoverable && styles.hoverable
        )}
      >
        <path
          d="M227.736 37.9402C227.736 37.9402 316.096 158.858 239.364 277.872L231.207 292.936L215.51 292.669L207.869 277.337C135.32 155.888 227.736 37.9402 227.736 37.9402Z"
          fill="white"
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M239.464 277.874L231.307 292.938L215.61 292.671L207.969 277.339C217.938 279.209 228.54 279.189 239.464 277.874Z"
          fill={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M185.299 222.446C185.299 222.446 226.425 227.145 263.788 223.779L260.611 234.126C260.611 234.126 224.262 236.71 188.122 232.896L185.299 222.446Z"
          fill={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M189.742 237.524C189.742 237.524 226.879 241.555 258.932 238.699L255.282 247.538C255.282 247.538 224.14 249.71 193.091 246.482L189.742 237.524Z"
          fill={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M225.206 192.919C229.9 192.999 233.772 189.124 233.854 184.265C233.937 179.406 230.198 175.402 225.505 175.322C220.811 175.242 216.939 179.117 216.856 183.976C216.774 188.836 220.512 192.84 225.206 192.919Z"
          fill="#14192C"
          stroke={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M225.741 161.324C230.435 161.404 234.307 157.529 234.389 152.67C234.472 147.81 230.734 143.806 226.04 143.727C221.346 143.647 217.474 147.522 217.392 152.381C217.309 157.24 221.047 161.244 225.741 161.324Z"
          fill="#14192C"
          stroke={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M226.276 129.829C230.97 129.908 234.842 126.034 234.924 121.174C235.007 116.315 231.269 112.311 226.575 112.231C221.881 112.152 218.009 116.026 217.927 120.886C217.844 125.745 221.582 129.749 226.276 129.829Z"
          fill="#14192C"
          stroke={foundParts?.includes("ROCKET_BODY") ? "#FA3757" : "#B7B7B7"}
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
      </g>
      <path
        onClick={
          foundParts?.includes("ROCKET_TIP")
            ? () => onClick?.("ROCKET_TIP")
            : undefined
        }
        className={className(
          styles.rocketIconRocketTip,
          foundParts?.includes("ROCKET_TIP") && hoverable && styles.hoverable
        )}
        d="M254.652 90.2046C242.394 58.1919 227.635 37.9385 227.635 37.9385C227.635 37.9385 212.302 57.481 199.067 88.8609C214.998 93.0319 234.106 92.7562 254.652 90.2046Z"
        fill={foundParts?.includes("ROCKET_TIP") ? "#FA3757" : "#B7B7B7"}
        stroke="#14192C"
        strokeWidth="1.9664"
        strokeMiterlimit="10"
      />
      <g
        onClick={
          foundParts?.includes("ROCKET_FINS")
            ? () => onClick?.("ROCKET_FINS")
            : undefined
        }
        className={className(
          styles.rocketIconRocketFins,
          foundParts?.includes("ROCKET_FINS") && hoverable && styles.hoverable
        )}
      >
        <path
          d="M225.15 284.532C224.54 320.427 223.348 349.411 222.448 349.395C221.548 349.38 221.342 320.272 221.95 284.478C222.558 248.683 223.915 210 224.815 210.015C225.714 210.031 225.759 248.637 225.15 284.532Z"
          fill={foundParts?.includes("ROCKET_FINS") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M160.627 202.825C160.627 202.825 140.562 259.492 156.556 336.575C156.556 336.575 166.426 261.832 195.963 254.032C195.963 254.032 190.307 239.634 188.017 233.094C187.917 233.092 157.903 227.782 160.627 202.825Z"
          fill={foundParts?.includes("ROCKET_FINS") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
        <path
          d="M289.31 205.01C289.31 205.01 307.44 262.326 288.838 338.821C288.838 338.821 281.511 263.786 252.256 254.988C252.256 254.988 258.398 240.79 260.908 234.332C261.008 234.333 291.185 230.045 289.31 205.01Z"
          fill={foundParts?.includes("ROCKET_FINS") ? "#FA3757" : "#B7B7B7"}
          stroke="#14192C"
          strokeWidth="1.9664"
          strokeMiterlimit="10"
        />
      </g>

      <defs>
        <clipPath id="clip0_114_1054">
          <rect width="62" height="97" fill="white" />
        </clipPath>
        <clipPath id="clip1_114_1054">
          <rect
            width="66.6023"
            height="67.9883"
            fill="white"
            transform="translate(-16 43.291) rotate(-40.541)"
          />
        </clipPath>
      </defs>
      <defs>
        <clipPath id="clip0_32_1193">
          <rect width="456" height="354" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
