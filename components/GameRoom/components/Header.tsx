import React, { useCallback } from "react";
import { HeaderIcon, SoundToggleIcon } from "../../Icon";
import styles from "../GameRoom.module.scss";
import { className } from "../../../utils/classnames";
import { sounds } from "../../../assets/sounds";

export const Header = () => {
  const [toggleSound, setToggleSound] = React.useState(true);

  React.useEffect(() => {
    const volume = toggleSound ? 1 : 0;

    Object.values(sounds).forEach((sound) => (sound.volume = volume));
  }, [toggleSound]);

  const handleToggleSound = useCallback(() => {
    setToggleSound((t) => !t);
  }, []);

  return (
    <div className={className(styles.header)}>
      <HeaderIcon>
        <SoundToggleIcon onClick={handleToggleSound} />
      </HeaderIcon>
      <span>Space Race</span>
    </div>
  );
};
