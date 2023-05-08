import Head from "next/head";
import { Inter } from "next/font/google";
import Home from "@/components/Home";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Broccoli & Co</title>
        <meta
          name="description"
          content="Broccoli & Co, A better way to enjoy your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`main ${inter.className}`}>
        <Header />
        <Home />
        <Footer />
      </main>
    </>
  );
}
