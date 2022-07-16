import type { NextPage } from "next";
import Head from "next/head";
import { ChatWindow } from "../components/ChatWindow";
import { RoomList } from "../components/RoomList";
import { CreateRoom } from "../components/CreateRoom";
import { GameRoom } from "../components/GameRoom";

const Play: NextPage = () => {
  return (
    <div style={{ color: "white" }}>
      <Head>
        <title>SpaceRace</title>
        <meta name="description" content="SpaceRace - GMTK 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameRoom />
      <ChatWindow />
    </div>
  );
};

export default Play;
