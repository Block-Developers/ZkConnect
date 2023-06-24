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

      <div className="hero1">
      <div id="features" className="font-extrabold text-2xl pt-20">
          Explore {stats?.jobs} Jobs
        </div>

        <div className="flex gap-6 justify-between items-center flex-col md:flex-row w-full">
          <div className="flex gap-6 items-center w-full">
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <div className="text-xl text-dark-300 dark:text-white font-bold line-clamp-1">
                  FrontEnd Developer
                </div>
                <div className="text-light-300 text-lg font-medium line-clamp-1">
                  Questbook • On-site
                </div>
                <div className="flex flex-row gap-4 overflow-x-auto w-job-card md:w-full">
                  Chennai
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-fit flex justify-between items-center md:justify-end md:flex-col md:items-end text-white gap-2">
            <div className="whitespace-nowrap text-dark-300 dark:text-white font-semibold text-lg ">
              Salary:{" "}
            </div>

            <div className="whitespace-nowrap text-md text-dark-300 dark:text-light-300  ">
              <div className="w-fit">
                <div className="rounded-lg border border-light-400 dark:border-dark-100 flex items-center justify-center h-32 w-32">
                  <Image
                    src={data.company.avatar_url || CompanyPlaceholder}
                    height={250}
                    width={250}
                    alt="Job Logo"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
