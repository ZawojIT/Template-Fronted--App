import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/common/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ZawojIT Template for Fontend App</title>
        <meta name='description' content='ZawojIT Template for Fontend App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}></main>
    </>
  );
}
