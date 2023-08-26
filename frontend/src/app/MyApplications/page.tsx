"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import Image from "next/image";
import { MdOutlinePending } from "react-icons/md";
import DashNav from "../components/DashNav";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getLocalStorageWithExpiry } from "../components/store";
function Page() {
  const [loading, setLoading] = useState(true);
  const [application, setApplications] = useState(null);
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [token, setToken] = useState("");
  const router = useRouter(); // Initialize the router
  useEffect(() => {
    const retrievedValue = getLocalStorageWithExpiry("userId");
    setToken(retrievedValue.token);
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
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://zk-backend.vercel.app/jobPosts/my-applications",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setApplications(jsonData.applications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  console.log(application);
  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <div className="hero2">
            <DashNav />

            <div className="py-44">
              <div className="flex justify-center items-center py-4  md:text-[40px] font-agrandir font-extrabold leading-6 text-white pt-[80px]">
                {" "}
                <span className="underline">My Applications</span>{" "}
                <span className="no-underline">🚀</span>
              </div>
              {application?.map((application) => (
                <div
                  key={application._id}
                  className="md:px-[100px] md:py-[54px] pt-[10px] px-[10px]"
                >
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-left text-sm font-light text-white ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                              <tr>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  Company&apos;s Name
                                </th>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  Profile
                                </th>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  No. of Application
                                </th>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  Date of Submitting
                                </th>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="md:px-6 md:py-4 py-2 px-3"
                                >
                                  Resume
                                </th>
                              </tr>
                            </thead>
                            <tbody className="rounded-xl">
                              <tr className="border transition duration-300 ease-in-out hover:text-black hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 mb-[25px] p-[30px] rounded-3xl">
                                <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3 font-medium">
                                  <div className="flex space-x-2">
                                    <img
                                      src="data:image/png;base64,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"
                                      className="w-14 h-14 rounded-md"
                                      alt=""
                                    />
                                    <h1 className="pt-4">
                                      {application.jobPost.company.companyName}
                                    </h1>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                  {application.jobPost.roleName}
                                </td>
                                <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                  {application.jobPost.__v}
                                </td>
                                <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                  {new Date(
                                    application.appliedDate
                                  ).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap flex gap-3  md:px-6 md:mt-6 py-2 px-3">
                                  {application.status === "pending" && (
                                    <MdOutlinePending
                                      size={20}
                                      color="orange"
                                    />
                                  )}
                                  {application.status === "selected" && (
                                    <FaCheckCircle size={20} color="green" />
                                  )}
                                  {application.status === "rejected" && (
                                    <FaExclamationTriangle
                                      size={20}
                                      color="red"
                                    />
                                  )}

                                  {application.status}
                                </td>
                                <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                  {" "}
                                  <IoMdCloudUpload size={32} color="blue" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Page;
