"use client";
import { useEffect, useState } from "react";
import { getLocalStorageWithExpiry } from "./../[id]/../../components/store";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import DashNav from "@/app/components/DashNav";
import { useRouter } from "next/navigation";

export default function ApplicationProcess({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const [jobDetails, setJobDetails] = useState(null);
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const router = useRouter(); // Initialize the router
  useEffect(() => {
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

  useEffect(() => {
    if (id) {
      // Replace the following line with your actual data fetching logic
      const fetchData = async () => {
        const response = await fetch(
          `https://zk-backend.vercel.app/jobPosts/${id}`
        );
        const data = await response.json();
        setJobDetails(data.jobPost);
      };
      fetchData();
    }
  }, [id]);
  console.log(jobDetails);

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Display loading message or spinner
      ) : (
        <>
          <div className="hero2 ">
            <div className="bg-[#110F0F]">
              <DashNav />
            </div>
            {jobDetails && (
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
                            {jobDetails.roleName}
                          </div>
                          <div className="text-light-300 text-lg font-medium line-clamp-1">
                            {jobDetails.company.companyName} •{" "}
                            {jobDetails.modeOfWork}
                          </div>
                          <div className="flex flex-row gap-4 overflow-x-auto w-job-card md:w-full">
                            <BiSearchAlt2 className="mt-1" />
                            {jobDetails.company.companyLocation}
                          </div>
                          <div className="flex flex-row space-x-4">
                            <div>
                              <p className="text-[#7A7A7A]">Duration</p>
                              <p className="text-sm">
                                {jobDetails.duration} Months
                              </p>
                            </div>
                            <div>
                              <p className="text-[#7A7A7A]">Stipend</p>
                              <p className="text-sm">
                                {jobDetails.stipendValue} /month
                              </p>
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
                              src=""
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
                      About {jobDetails.company.companyName}
                    </div>
                    <div>
                      <p className="text-sm text-[#7A7A7A]">
                        {jobDetails.company.companyregister[0].CompanyProfile}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl text-white font-bold line-clamp-1">
                      About {jobDetails.roleName}{" "}
                    </div>
                    <div>
                      <p className="text-sm text-[#7A7A7A]">
                        {jobDetails.aboutRole}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl text-white font-bold line-clamp-1 py-5">
                      Skills Required
                    </div>
                    <div className="flex md:gap-5 gap-1  ">
                      {jobDetails.selectedSkills.map((skill, index) => (
                        <button
                          key={index}
                          className="px-2 py-2 md:px-5 md:py-2 text-sm  bg-[#D7D7D7C9] bg-opacity-80 rounded-[27px] text-black"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="py-5">
                    <div className="text-xl text-white font-bold line-clamp-1">
                      Number of Openings
                    </div>
                    <p className="text-lg">{jobDetails.numberOfOpening}</p>
                  </div>

                  <div className="py-5">
                    <div className="text-xl text-white font-bold line-clamp-1">
                      Your Resume
                    </div>
                    <p className="text-sm text-[#7A7A7A]">
                      Your current resume will be submitted along with this
                      application.{" "}
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
            )}
          </div>
        </>
      )}
    </>
  );
}
