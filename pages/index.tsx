import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceRace</title>
        <meta name="description" content="SpaceRace - GMTK 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hola
    </div>
  );
};

export default Home;
