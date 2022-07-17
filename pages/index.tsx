import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeComponent } from '../components/Home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SpaceRace</title>
        <meta name='description' content='SpaceRace - GMTK 2022' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomeComponent />
    </>
  );
};

export default Home;
