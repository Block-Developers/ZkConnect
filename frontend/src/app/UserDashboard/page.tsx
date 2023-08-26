"use client";

import { FaHome, FaRunning, FaFile } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getLocalStorageWithExpiry } from "../components/store";
import Resume from "../../Assets/Resumel.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import DashNav from "../components/DashNav";
import Image from "next/image";
import compt from "../../Assets/Group 37086.png";
import Logo from "../../Assets/LOGOS.png";

export default function UserDashboard() {
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const router = useRouter(); // Initialize the router
  useEffect(() => {
    // Perform localStorage action
    const retrievedValue = getLocalStorageWithExpiry("userId");
    console.log(retrievedValue);
    if (!retrievedValue?.token) {
      router.push("/Login");
    } else if (retrievedValue.user.role == "user") {
      setUserdata(retrievedValue.user);
      setLoading(false);
    } else {
      router.push("/Login");
    }
  }, []);

  const name = userdata?.username;
  return (
    <>
      {loading ? (
        <div>Loading...</div> // Display loading message or spinner
      ) : (
        <>
          <section className="hero3 relative pt-[95px] pb-0  ">
            <div>
              <DashNav />
            </div>
            <div className="flex relative">
              {/* Text and Search Bar */}
              <div className="z-20">
                <div className="text-white md:text-[90px] text-[30px] font-agrandir  pt-20 px-32">
                  <div className="font-extrabold">
                    <span className="getjob">Get Your</span> <br />
                    <span className="getjob">Dream Job 🚀</span>
                  </div>
                  <div className="flex justify-center items-center relative md:bottom-0 md:left-0 md:mx-[0px] mt-[5px] rounded-3xl bg-[#0000008F] bg-opacity-50 w-[560px] h-[50px] text-white">
                    <div className="flex space-x-3">
                      <div className="py-3 flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-2 cursor-pointer">
                        <FaHome className="w-8 h-8" />
                        Find Job Here
                      </div>
                      <div className="py-3  flex text-center text-[22px] leading-6 font-agrandir justify-start items-center gap-2 cursor-pointer">
                        {" "}
                        <FaRunning className="w-8 h-8" />
                        Chennai, India
                      </div>
                      <button className=" px-5 my-2  bg-[#640074] text-white rounded-3xl flex text-center text-[18px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Resume Image */}
              <div className="absolute z-10 right-0 top-0">
                <Image src={Resume} alt="" />
              </div>
              {/* Logo Image */}
              <div className="absolute z-0 right-0 mt-80">
                <Image src={Logo} alt="" className="h-80" />
              </div>
            </div>
            <div className="flex justify-between mb-0">
              {/* Other Images */}
              <Image src={compt} alt="" className="h-40 ml-48 my-[39px]" />
            </div>
          </section>
        </>
      )}
    </>
  );
}
