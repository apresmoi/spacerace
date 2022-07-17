import { NextPage } from 'next';
import Head from "next/head";
import { CreditsComponent } from '../components/Credits';

const Credits: NextPage = () => {
    <Head>
    <title>SpaceRace</title>
    <meta name="description" content="SpaceRace - GMTK 2022" />
    <link rel="icon" href="/favicon.ico" />
    </Head>   
  return <CreditsComponent />;
};

export default Credits;