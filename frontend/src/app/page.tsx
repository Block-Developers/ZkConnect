import Jobslist from "./components/Jobslist";
import NavBar from "./components/Navbar";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import User from "../Assets/users.png";

export default function Home() {
  return (
    <main>
      <Head>
        <title>My page title</title>
      </Head>
      <NavBar />

      <div className="hero1 md:mt-[100px]">
        <div className="flex flex-col text-white justify-center items-center h-screen md:pb-[50px]">
          <div className="md:w-[600px] md:text-[55px] md:px-0 px-5 font-agrandir font-extrabold md:leading-80">
            Smarter tech talent{" "}
            <span className="bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent">
              Acquisition
            </span>{" "}
            with AI-powered testing and secure filtering.
            <span className="md:w-[600px] md:text-[16px] text-white text-opacity-60 text-base font-agrandir leading-6 tracking-tighter">
              &nbsp; Hirehub where tech talent meets opportunity. Our AI-driven
              platform simplifies recruitment, enabling companies to discover
              top candidates and conduct secure, skill-based assessments for
              seamless hiring.
            </span>
          </div>

          <button className="py-4 px-6 border bg-[#FFA800] rounded-[1000px] text-[14px] font-agrandir font-bold text-black uppercase mt-[20px]  flex justify-start">
            Crack now
          </button>
        </div>
      </div>

      <div className="hero2 md:px-40">
        <div
          id="features"
          className="font-extrabold text-center text-white pb-5 text-2xl md:pt-5"
        >
          Explore 10 Jobs
        </div>
        <div className="px-3 flex flex-col space-y-4 pb-5">
          <Jobslist />
          <Jobslist />
          <Jobslist />
          <Link href="jobs">
            <p className="text-center text-lg cursor-pointer text-blue-600 ">
              Show More ➡
            </p>
          </Link>

          <div
            id="features"
            className="font-extrabold text-center text-white pb-5 text-2xl pt-20"
          >
            How it Works?
          </div>
          <div className="flex justify-center pb-10 text-white text-center font-extrabold text-lg ">
            <p className="border border-white bg-[#9000A7] p-2 rounded-l-md">
              As User
            </p>
            <p className="border border-white p-2 rounded-r-md">As Company</p>
          </div>
          <Image src={User} alt="" />
          <div
            id="features"
            className="font-extrabold text-center text-white pb-5 text-2xl pt-20"
          >
            Contact Us
          </div>
        </div>
      </div>
    </main>
  );
}
