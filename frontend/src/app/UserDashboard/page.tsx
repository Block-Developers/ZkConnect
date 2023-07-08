import CustomNav from "../components/customNav";
import { FaHome, FaRunning, FaFile } from "react-icons/fa";

export default function UserDashboard() {
  return (
    <section className="hero3 py-[60px] pb-[100px]">
      <div>
        <CustomNav />
      </div>
      <div className="h-screen mt-[100px]">
        <div className="flex justify-center items-center text-white mid:text-[50px] text-[30px] font-agrandir text-center">
          Hi Nagi! <br /> Lets assist you to get the job of your dream 🚀
        </div>
        <div className="flex justify-center items-center relative md:bottom-0 mid:left-0 md:mx-[100px] my-[35px] rounded-3xl bg-[#0000008F] bg-opacity-50 w-[360px] h-[320px] text-white px-auto">
          <div>
            <div className="p-[30px] flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              <FaHome className="w-8 h-8" />
              Home
            </div>
            <div className="p-[30px] flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              {" "}
              <FaRunning className="w-8 h-8" />
              Jobs
            </div>
            <div className="p-[30px] flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
              <FaFile className="w-8 h-8" />
              My Applications
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
