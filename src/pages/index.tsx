import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presale from "../components/Presale";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Sentinels | AI</title>
        <meta content="Smart Sentinels - A Crypto Project" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Navbar />
      <Hero />
      <main className={styles.main}>
        <Presale />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
};

export default Home;