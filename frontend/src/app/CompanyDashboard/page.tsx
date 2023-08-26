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
import Link from "next/link";

export default function CompanyDashboard() {
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const router = useRouter(); // Initialize the router
  useEffect(() => {
    // Perform localStorage action
    const retrievedValue = getLocalStorageWithExpiry("userId");
    console.log(retrievedValue);
    if (!retrievedValue?.token) {
      router.push("/Login");
    } else if (retrievedValue.user.role == "company") {
      setUserdata(retrievedValue.user);
      setLoading(false);
    } else {
      router.push("/CompanyDashboard");
    }
  }, []);
  const name = userdata?.username;
  return (
    <>
      {loading ? ( // Use loading state to conditionally render content
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
                <div className="text-white md:text-[90px] text-[30px] font-agrandir font-bold pt-20 px-32">
                  <div className="font-extrabold">
                    <span className="getjob">Hire Your</span> <br />
                    <span className="getjob">Applicant 🚀</span>
                  </div>
                  <div className="flex justify-center items-center relative md:bottom-0 md:left-0 md:mx-[0px] mt-[5px] rounded-3xl  w-[560px] h-[50px] text-white">
                    <Link href="/CompanyPost" className="">
                      <button className=" px-5 py-3 my-2 text-lg bg-[#640074] text-white rounded-2xl flex text-center  leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
                        Create Post
                      </button>
                    </Link>
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
