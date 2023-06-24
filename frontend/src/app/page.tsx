import Image from "next/image";
import NavBar from "./components/Navbar";
import Head from "next/head";
import Login from "./Login";

export default function Home() {
  return (
    <main>
      <Head>
        <title>My page title</title>
      </Head>
      <NavBar />
      <Login />
    </main>
  );
}
