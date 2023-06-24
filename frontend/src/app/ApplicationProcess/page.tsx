import Link from "next/link";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import logo from "../../Assets/Vector.png";
import MainNav from "../components/mainNav";
export default function ApplicationProcess() {
  return (
    <div className="hero2 ">
      <div className="bg-[#110F0F]">
        <MainNav />
      </div>

      <div className="pt-[150px] pb-[100px]  px-5 md:px-[100px]">
        <div className="flex justify-center items-center">
          <h1 className="text-center md:text-[40px] leading-6 text-lg  font-agrandir font-bold text-white pb-5 md:pb-[80px]">
            Application Process
          </h1>
        </div>
        <div className=" rounded-xl text-white  dark:bg-dark-700 p-8 cursor-pointer  border-white border-[4px] hover:border-light-400 hover:dark:border-dark-100 w-full ">
          <div className="flex gap-20 md:gap-6   justify-between items-center flex-row w-full mb-[30px]">
            <div className="flex gap-6 items-center w-3/4 md:w-full">
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div className="text-xl text-white font-bold line-clamp-1">
                    FrontEnd Developer
                  </div>
                  <div className="text-light-300 text-lg font-medium line-clamp-1">
                    Questbook • On-site
                  </div>
                  <div className="flex flex-row gap-4 overflow-x-auto w-job-card md:w-full">
                    <BiSearchAlt2 className="mt-1" />
                    Chennai
                  </div>
                  <div className="flex flex-row space-x-4">
                    <div>
                      <p className="text-[#7A7A7A]">Duration</p>
                      <p className="text-sm">2 Months</p>
                    </div>
                    <div>
                      <p className="text-[#7A7A7A]">Stipend</p>
                      <p className="text-sm">2,000 /month</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#7A7A7A]">Mode</p>
                    <p className="text-sm">Internship</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" py-5 w-1/4 md:w-full flex justify-between items-center md:justify-end md:flex-col md:items-end text-white gap-2">
              <div className="whitespace-nowrap text-md text-dark-300 dark:text-light-300  ">
                <div className="w-fit">
                  <div className="rounded-lg border border-light-400 dark:border-dark-100 flex items-center justify-center h-14 w-14 md:h-32 md:w-32">
                    <Image
                      src={logo}
                      alt="Job Logo"
                      className=" h-8 w-8 md:h-20  md:w-20 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="text-xl text-white font-bold line-clamp-1">
              About Superteam
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">
                Hirehub where tech talent meets opportunity. Our AI-driven
                platform simplifies recruitment, enabling companies to discover
                top candidates and conduct secure, skill-based assessments for
                seamless hiring.
              </p>
            </div>
          </div>
          <div>
            <div className="text-xl text-white font-bold line-clamp-1">
              About Full Stack Developer{" "}
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">
                Hirehub where tech talent meets opportunity. Our AI-driven
                platform simplifies recruitment, enabling companies to discover
                top candidates and conduct secure, skill-based assessments for
                seamless hiring.
              </p>
            </div>
          </div>
          <div>
            <div className="text-xl text-white font-bold line-clamp-1 py-5">
              Skills Required
            </div>
            <div className="flex md:gap-5 gap-1  ">
              <button className="px-2 py-2 md:px-5 md:py-2 text-sm  bg-[#D7D7D7C9] bg-opacity-80 rounded-[27px] text-black">
                ReactJs
              </button>
              <button className="px-2 py-2 md:px-5 md:py-2 text-sm bg-[#D7D7D7C9] bg-opacity-80 rounded-[27px] text-black">
                NextJs
              </button>
              <button className="px-2 py-2 md:px-5 md:py-2 text-sm bg-[#D7D7D7C9] bg-opacity-80 rounded-[27px] text-black">
                TypeScript
              </button>
            </div>
          </div>
          <div className="py-5">
            <div className="text-xl text-white font-bold line-clamp-1">
              Number of Openings
            </div>
            <p className="text-lg">5</p>
          </div>

          <div className="py-5">
            <div className="text-xl text-white font-bold line-clamp-1">
              Provide your Github
            </div>
            <div className="flex gap-[50px] py-6">
              <div className="w-full">
                <input
                  type="url"
                  className="bg-transparent border w-3/4 rounded-lg h-[30px]"
                />
                <button className="border rounded-xl w-0.7/4 mx-[20px] mt-5 md:mt-0 px-5 py-3 border-black bg-white text-black text-[20px] font-agrandir font-extrabold leading-6">
                  Reclaim
                </button>
                <div className=" text-center"></div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="text-xl text-white font-bold line-clamp-1">
              Your Resume
            </div>
            <p className="text-sm text-[#7A7A7A]">
              Your current resume will be submitted along with this application.{" "}
              <span className="text-[#0099FF]"> Edit resume</span>
            </p>
          </div>

          <div
            className="flex justify-center items-center
          "
          >
            <button className="px-6 py-3 bg-[#7D088F] md:text-[30px] font-bold font-agrandir leading-6 text-white rounded-[20px]">
              {" "}
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
