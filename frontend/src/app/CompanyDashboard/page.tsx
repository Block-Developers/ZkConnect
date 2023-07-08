import CustomNav from "../components/customNav";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaRunning, FaFile } from "react-icons/fa";

export default function CompanyDashboard() {
  return (
    <section className="hero3 py-[95px] pb-[100px]">
      <div>
        <CustomNav />
      </div>
      <div>
        <div className="flex justify-center items-center text-white md:text-[50px] text-[30px]  px-4 font-agrandir text-center">
          Hi Team Name ! <br /> Let&apos;s assist you get the empolyee for your
          comapny 🚀
        </div>
        <div className="flex justify-center items-center relative md:bottom-0 md:left-0 md:mx-[100px] my-[35px] rounded-3xl bg-[#0000008F] bg-opacity-50 w-[360px] h-[320px] text-white px-auto">
          <div>
            <div className="py-3 flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              <FaHome className="w-8 h-8" />
              Home
            </div>
            <div className="py-3 flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              {" "}
              <FaRunning className="w-8 h-8" />
              Create Post
            </div>
            <div className="py-3 flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              <FaFile className="w-8 h-8" />
              Past Post Applications
            </div>
            <div className="py-3 flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              <CgProfile className="w-8 h-8" />
              Profile
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
