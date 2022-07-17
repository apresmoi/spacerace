import { NextPage } from "next";
import Head from "next/head";
import { PlayInstructions } from "../components/PlayInstructions";

const Instructions: NextPage = () => {
    return (
        <>
            <Head>
                <title>SpaceRace</title>
                <meta name="description" content="SpaceRace - GMTK 2022" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PlayInstructions />
        </>

    )
};

export default Instructions;