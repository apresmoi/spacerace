import type { NextPage } from "next";
import Head from "next/head";
import { ChatWindow } from "../components/ChatWindow";
import { RoomList } from "../components/RoomList";
import { CreateRoom } from "../components/CreateRoom";
import { GameRoom } from "../components/GameRoom";
import { useRouter } from "next/router";
import { useGame } from "../store";

const Play: NextPage = () => {
  const router = useRouter();

  return (
    <div style={{ color: "white" }}>
      <Head>
        <title>SpaceRace</title>
        <meta name="description" content="SpaceRace - GMTK 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameRoom onNotLoggedIn={() => router.push("/rooms")} />
    </div>
  );
};

export default Play;
