import React from "react";
import { IPlayer } from "../../../socket/types";
import { getBlockId } from "../utils";
import styles from "../GameRoom.module.scss";

interface PlayerProps {
  player: IPlayer;
}

export function Player(props: PlayerProps) {
  const { player } = props;

  return (
    <div
      className={styles.player}
      style={{
        gridArea: getBlockId(player.x, player.y),
      }}
    >
      <svg viewBox="0 0 76 124" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_27_10833)">
          <path
            d="M64.5538 41.1641C64.5538 41.1641 76.1883 44.3968 74.1879 57.8876C72.1875 71.3945 72.9717 78.1 58.1845 78.036C49.3346 77.988 43.2693 59.1199 47.9423 48.5256C51.063 41.4201 64.5538 41.1641 64.5538 41.1641Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.449 50.9422C31.8906 44.1248 32.7228 38.1395 37.1558 39.2597C42.741 40.668 43.2851 46.5413 40.2764 50.062C37.2678 53.5828 31.1385 58.992 30.2263 59.5201C25.8253 62.0806 18.6878 65.5854 16.4953 64.7052L12.7345 57.3436C14.4949 55.7113 23.3288 51.9665 24.449 50.9422Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.4954 64.6891L13.1506 65.8254L9.37383 58.4638L12.7346 57.3115L16.4954 64.6891Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.9116 65.121C12.9116 65.121 11.8554 65.6652 9.02279 67.2815C6.19018 68.8979 3.58161 69.0099 1.40515 66.4813C-0.771321 63.9528 -0.435248 62.2404 2.52539 61.3762C3.62962 61.0562 5.40601 61.1842 5.40601 61.1842C5.40601 61.1842 2.84546 60.8961 3.00549 59.5038C3.22954 57.5994 8.04658 59.6319 10.095 59.6639L12.9116 65.121Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.34912 63.2485C6.34912 63.2485 2.18823 63.9367 0.0117644 63.4726"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.668329 65.4893C0.668329 65.4893 2.71677 66.3375 6.90967 64.7852"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.26891 67.3139C2.26891 67.3139 5.14952 67.6179 7.72607 66.0176"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.2665 65.8413C29.2665 55.103 29.6986 38.6195 36.6601 36.555C40.6449 35.3708 59.3369 37.7553 59.3369 37.7553C59.3369 37.7553 60.4572 38.8435 63.0337 40.7639C70.1232 46.0931 62.5056 68.1458 59.1769 80.2924C55.7041 94.0714 55.5121 111.323 55.5121 111.323L48.9027 112.395C48.9027 112.395 47.3183 109.691 45.974 103.321C44.5337 96.4879 41.285 79.3962 41.285 79.3962C41.285 79.3962 34.3556 81.2846 33.2353 82.2768C32.1151 83.2531 29.9066 93.9433 27.9702 103.273L20.1605 102.297C20.1605 102.297 20.8647 79.7963 21.9369 76.9637C23.0251 74.1631 29.2665 68.6579 29.2665 65.8413Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.8569 102.281L20.337 91.0469C20.337 91.0469 21.1051 92.2791 25.106 92.7752C27.5545 93.0793 30.8352 92.3592 30.8352 92.3592C30.8352 92.3592 29.1708 101.129 29.1068 102.233C28.8508 106.714 29.1068 106.234 28.5147 110.987L9.98273 108.667C8.71846 103.882 12.4153 99.5607 19.8569 102.281Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.79056 109.931C10.2066 109.979 10.1586 110.363 10.5907 110.411C11.0068 110.459 11.0548 110.075 11.4869 110.139C11.903 110.187 11.855 110.571 12.2871 110.619C12.7032 110.667 12.7512 110.283 13.1833 110.347C13.5994 110.395 13.5514 110.779 13.9835 110.827C14.3996 110.875 14.4476 110.507 14.8796 110.555C15.2957 110.603 15.2477 110.987 15.6798 111.035C16.0959 111.084 16.1439 110.699 16.576 110.763C16.9921 110.811 16.9441 111.196 17.3762 111.244C17.7923 111.292 17.8403 110.923 18.2724 110.971C18.6885 111.02 18.6405 111.404 19.0726 111.452C19.4886 111.5 19.5366 111.116 19.9687 111.18C20.3848 111.228 20.3368 111.612 20.7689 111.66C21.185 111.708 21.233 111.324 21.6651 111.388C22.0812 111.436 22.0332 111.82 22.4653 111.868C22.8814 111.916 22.9294 111.548 23.3615 111.596C23.7776 111.644 23.7295 112.028 24.1616 112.076C24.5777 112.124 24.6257 111.74 25.0578 111.804C25.4739 111.852 25.4259 112.236 25.858 112.284C26.2741 112.332 26.3221 111.948 26.7542 112.012C27.1703 112.06 27.1223 112.444 27.5544 112.492C27.9705 112.54 28.0185 112.156 28.4506 112.22L28.6106 110.987L10.0466 108.667L9.79056 109.931Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47.494 114.476L45.9737 103.337C45.9737 103.337 46.9499 104.41 50.9828 104.202C53.4473 104.074 56.536 102.777 56.536 102.777C56.536 102.777 56.456 111.707 56.584 112.795C57.1281 117.244 57.2881 116.732 57.5442 121.517L38.8842 122.526C36.8037 118.029 39.6844 113.132 47.494 114.476Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38.9486 123.79C39.3807 123.774 39.3967 124.142 39.8128 124.126C40.2449 124.11 40.2129 123.726 40.645 123.694C41.0771 123.678 41.0931 124.046 41.5092 124.03C41.9413 124.014 41.9093 123.63 42.3414 123.598C42.7575 123.582 42.7895 123.966 43.2056 123.934C43.6376 123.902 43.6056 123.534 44.0377 123.502C44.4698 123.486 44.4858 123.854 44.9019 123.838C45.334 123.822 45.302 123.438 45.7341 123.406C46.1662 123.39 46.1822 123.758 46.5983 123.742C47.0144 123.726 46.9984 123.342 47.4305 123.31C47.8466 123.294 47.8786 123.662 48.2946 123.646C48.7107 123.63 48.6947 123.246 49.1268 123.214C49.5589 123.198 49.5749 123.582 49.991 123.55C50.4231 123.534 50.3911 123.15 50.8232 123.118C51.2553 123.102 51.2713 123.486 51.6874 123.454C52.1035 123.438 52.0875 123.054 52.5196 123.022C52.9516 123.006 52.9677 123.39 53.3837 123.358C53.8158 123.342 53.7838 122.958 54.2159 122.926C54.632 122.91 54.664 123.294 55.0801 123.262C55.5122 123.23 55.4802 122.862 55.9123 122.83C56.3444 122.814 56.3604 123.198 56.7765 123.166C57.2086 123.15 57.1765 122.766 57.6086 122.734L57.5446 121.485L38.8686 122.494L38.9486 123.79Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M61.2894 61.4729C60.3452 51.4227 59.625 44.3012 59.625 44.3012C64.122 40.7004 69.1311 43.8051 70.1233 48.3181C71.1155 52.8471 71.7396 60.9928 71.6116 62.033C70.9875 67.0901 69.4991 74.8998 67.4667 76.1L59.3209 74.6597C59.0969 72.2912 61.4334 62.9772 61.2894 61.4729Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M67.4504 76.1L66.3462 79.4607L58.2005 78.0364L59.3047 74.6597L67.4504 76.1Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M65.6418 79.2208C65.6418 79.2208 65.4338 80.389 65.0177 83.6217C64.6016 86.8544 63.1133 88.9989 59.7846 89.2069C56.4559 89.415 55.2876 88.1347 56.3919 85.2381C56.7919 84.1658 57.9762 82.8215 57.9762 82.8215C57.9762 82.8215 56.1998 84.694 55.1916 83.7177C53.7993 82.3895 58.3443 79.7649 59.5925 78.1646L65.6418 79.2208Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60.2004 83.3174C60.2004 83.3174 58.248 87.0622 56.5517 88.5025"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58.5681 89.2226C58.5681 89.2226 60.4885 88.0864 61.7688 83.8135"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60.9693 89.0473C60.9693 89.0473 62.9538 86.9348 63.2258 83.9102"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M68.2649 30.7778C68.2649 30.7778 66.6645 36.6991 64.264 38.9396C61.8635 41.1641 66.9526 41.4841 66.6485 43.0045C66.2004 45.2609 57.2065 49.3898 50.229 48.7817C36.242 47.5654 32.7373 39.6917 32.7373 39.6917C32.8173 37.8353 35.2818 37.1792 35.2818 37.1792C35.2818 37.1792 34.7377 34.7787 35.7299 33.5304L68.2649 30.7778Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.2101 18.2952C30.5137 28.8575 37.6993 38.7956 48.2615 40.492C58.8238 42.1883 68.7619 35.0028 70.4583 24.4405C72.1546 13.8783 64.9691 3.94013 54.4068 2.24376C43.8446 0.563404 33.9064 7.74895 32.2101 18.2952Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M53.6549 9.86161C62.7928 18.8235 60.2643 29.0337 60.2643 29.0337C60.2643 29.0337 46.6934 42.5246 33.1865 28.1215C33.1865 28.1215 30.0818 21.5281 32.7384 14.4066C35.395 7.28505 41.7803 4.06836 41.7803 4.06836C41.7803 4.06836 47.7016 4.03636 53.6549 9.86161Z"
            fill="#070B09"
          />
          <path
            d="M35.538 32.5705C49.525 44.477 62.9198 29.4658 62.9198 29.4658C62.9198 29.4658 64.3281 8.35728 45.8922 2.78809"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M56.3095 17.8794C58.1019 20.952 58.0859 26.3452 56.5335 26.9213C54.9812 27.4974 55.3813 21.4321 53.3649 19.0956C51.2684 16.6311 54.5011 14.7747 56.3095 17.8794Z"
            fill="white"
          />
          <path
            d="M53.7652 12.3899C54.4694 12.838 54.6614 13.7982 54.2133 14.5024L54.1173 14.6464C53.6692 15.3506 52.709 15.5426 52.0048 15.0945C51.3007 14.6464 51.1086 13.6862 51.5567 12.9821L51.6527 12.854C52.1008 12.1339 53.061 11.9258 53.7652 12.3899Z"
            fill="white"
          />
          <path
            d="M36.0347 26.265C36.3067 25.8809 36.8348 25.8009 37.1869 26.1529C38.1311 27.1291 42.036 29.5137 40.6597 31.258C39.6034 32.5863 38.1311 31.6261 37.1069 30.2818C35.8586 29.1936 35.0425 27.6252 36.0347 26.265Z"
            fill="white"
          />
          <path
            d="M66.2012 29.3536C68.4416 28.6655 71.2903 26.0249 72.3785 22.4721C73.1787 19.8956 72.0744 17.287 70.33 17.6231C70.33 17.6231 71.5463 24.6166 64.7769 26.7451L66.2012 29.3536Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M59.7685 28.5374C59.2564 30.2818 60.2486 32.1062 61.9769 32.6183C63.7213 33.1304 65.5457 32.1382 66.0578 30.4098C66.5699 28.6654 65.5777 26.841 63.8493 26.3289C62.121 25.8008 60.2966 26.793 59.7685 28.5374Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M61.5913 29.0656C61.3672 29.8017 61.7993 30.5859 62.5355 30.81C63.2716 31.034 64.0558 30.6019 64.2798 29.8658C64.5039 29.1296 64.0718 28.3454 63.3356 28.1214C62.5835 27.9133 61.7993 28.3294 61.5913 29.0656Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M63.8801 39.3877C63.8801 39.3877 57.0467 46.2692 47.1565 44.7328"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.3153 37.1792C35.3153 37.1792 38.292 41.3721 41.5247 42.8444"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33.5239 48.6695C33.5239 48.6695 34.7881 47.4853 37.0766 48.1414C39.3651 48.7976 51.2397 52.1743 51.2397 52.1743C52.2159 52.3023 52.904 53.1825 52.792 54.1587L50.7756 70.2582C50.6475 71.2344 49.7674 71.9225 48.7912 71.8105L32.9958 67.3135C32.5157 67.2495 31.1714 65.2971 31.1714 65.2971L33.5239 48.6695Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30.8988 64.1931C30.7867 65.0573 31.4109 65.8574 32.2751 65.9695L46.3101 69.9703C47.1743 70.0823 47.9744 69.4582 48.0864 68.594L49.8788 54.2869C49.9909 53.4228 49.3667 52.6226 48.5025 52.5266L34.4675 48.5257C33.6033 48.4137 32.8032 49.0378 32.6911 49.902L30.8988 64.1931Z"
            fill="#B4C4FA"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M49.72 71.2667L47.5595 69.5703"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52.4563 52.8784L49.7837 53.5026"
            stroke="#0D141E"
            strokeWidth="1.38026"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_27_10833">
            <rect width="76" height="124" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}