import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SpaceRace</title>
        <meta name='description' content='SpaceRace - GMTK 2022' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.home}>
        <div className={styles.title}>SpaceRace</div>
        <div className={styles.contentContainer}>
          <div className={styles.label}>
            There are 3 levels deep in the ocean:
            <br />- You&apos;ll be assigned 3 random creatures to chase in each level
          </div>
          <Image className={styles.img1} height={69} width={922} src='https://via.placeholder.com/922x69.png' alt='' />
          <div className={styles.label}>- Choose a room to play with your friends (max. 5)</div>
          <Image className={styles.img2} src='https://via.placeholder.com/318x40.png' height={40} width={318} alt='' />
          <div className={styles.label}>- Choose what part of the ship to drive (move with keyboard from 1 to 6)</div>
          <Image className={styles.img3} src='https://via.placeholder.com/435x80.png' height={80} width={435} alt='' />
        </div>
        <Link href='/login'>
          <div className={styles.button}>start a game!</div>
        </Link>
      </div>
    </>
  );
};

export default Home;
