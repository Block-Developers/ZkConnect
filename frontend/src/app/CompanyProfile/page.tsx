import MainNav from "../components/mainNav";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import logo from "../../Assets/Vector.png";
export default function CompanyProfile() {
  return (
    <section className="hero2 pb-[250px]">
      <div>
        <MainNav />
      </div>
      <div className="h-screen w-screen">
        <div className="flex justify-center items-center mt-[100px] md:pt-[80px] pt-[30px]">
          <h1 className="text-white text-center text-3xl font-agrandir">
            Company Profile
          </h1>
        </div>
        <div className="md:py-[70px] md:px-[80px] py-[30px] px-[30px] text-white font-agrandir ">
          <div className="flex flex-row gap-20">
            <div>
              <Image src={logo} alt="icon" className="w-[100px] h-[100px]" />
            </div>
            <div className="flex flex-col">
              <h3 className="md:text-[27px] text-[20px] font-bold leading-6 py-1">
                D Prashant
              </h3>
              <h4 className="text-[18px] font-medium leading-6 py-1">
                prashant@gmail.com
              </h4>
              <h4 className="text-[18px] font-medium leading-6 py-1">
                @prashant7
              </h4>
            </div>
          </div>
          <p className="py-4 text-[20px] font-agrandir leading-6 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam,{" "}
          </p>
          <div className="flex gap-4 py-2 px-3">
            <FaTwitter size={30} color="#1DA1F2" />
            <FaLinkedin size={30} color="#2867B2" />
            <FaGithub size={30} color="#211F1F" />
          </div>
          <h4 className="text-[20px] font-bold leading-9 pt-6">
            Add Something
          </h4>
          <p className="py-2.5 text-[20px] font-agrandir leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h4 className="text-[20px] font-bold leading-9 py-6">
            Top Skills Requirement
          </h4>

          <div className="flex md:flex-row flex-col gap-3">
            <button className="md:py-3 md:px-5 py-1 px-2 md:text-[18px] text-sm font-extrabold md:font-semibold bg-[#8D06A2] border  rounded-[10px] cursor-pointer">
              Full Stack
            </button>
            <button className="md:py-3 md:px-5 py-1 px-2 md:text-[18px] text-sm font-extrabold md:font-semibold bg-[#8D06A2] border  rounded-[10px] cursor-pointer">
              Front End
            </button>
            <button className="md:py-3 md:px-5 py-1 px-2 md:text-[18px] text-sm font-extrabold md:font-semibold bg-[#8D06A2] border  rounded-[10px] cursor-pointer">
              Back End
            </button>
            <button className="md:py-3 md:px-5 py-1 px-2 md:text-[18px] text-sm font-extrabold md:font-semibold bg-[#8D06A2] border  rounded-[10px] cursor-pointer">
              Designer
            </button>
          </div>

          <div className="flex md:gap-[100px] justify-between gap-2  py-8">
            <div className="flex flex-col">
              <h1 className="md:text-[20px] text-sm font-agrandir md:font-semibold font-bold md:py-4">
                Starting Year
              </h1>
              <h1 className="md:text-[18px] font-agrandir font-semibold">
                678
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="md:text-[20px] text-sm font-agrandir md:font-semibold font-bold  md:py-4">
                How many Employees
              </h1>
              <h1 className="md:text-[18px] font-agrandir font-semibold">78</h1>
            </div>
          </div>

          <div className="flex justify-center items-center mb-[50px]">
            <button className="bg-[#8D06A2] py-4 px-7 md:text-[25px] text-[20px] font-agrandir font-extrabold leading-6">
              Edit your Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
