import Image from "next/image";
import NavBar from "./components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>My page title</title>
      </Head>
      <NavBar />

      <div className="hero1 mt-[100px]">
        <div className="flex flex-col text-white justify-center items-center h-screen pb-[50px]">
          <div className="w-[600px] text-[55px] font-agrandir font-extrabold leading-80">
            Smarter tech talent{" "}
            <span className="bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent">
              Acquisition
            </span>{" "}
            with AI-powered testing and secure filtering
          </div>
          <div className="w-[600px] text-[16px] text-white text-opacity-60 text-base font-agrandir leading-6 tracking-tighter">
            Hirehub where tech talent meets opportunity. Our AI-driven platform
            simplifies recruitment, enabling companies to discover top
            candidates and conduct secure, skill-based assessments for seamless
            hiring.
          </div>

          <button className="py-4 px-6 border bg-[#FFA800] rounded-[1000px] text-[14px] font-agrandir font-bold text-black uppercase mt-[20px]  flex justify-start">
            Crack now
          </button>
        </div>
      </div>

      <div className="hero1"></div>
    </main>
  );
}
