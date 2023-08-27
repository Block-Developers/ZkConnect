"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import DashNav from "@/app/components/DashNav";
import { getLocalStorageWithExpiry } from "./../[id]/../../components/store";

export default function ApplicationProcess({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [jobDetails, setJobDetails] = useState(null);
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [updatingStatusForAppId, setUpdatingStatusForAppId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const retrievedValue = getLocalStorageWithExpiry("userId");
    const token = retrievedValue?.token;

    if (!token) {
      router.push("/Login");
    } else if (retrievedValue.user.role === "company") {
      setUserdata(retrievedValue.user);
      setLoading(false);
    } else {
      router.push("/Login");
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const retrievedValue = getLocalStorageWithExpiry("userId");
          const token = retrievedValue?.token;
          const response = await fetch(
            `https://zk-backend.vercel.app/jobPosts/${id}/applicants-details`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setJobDetails(jsonData.applicants);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id, token]);
  console.log(jobDetails);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusDropdownVisible, setStatusDropdownVisible] = useState(false);

  // Inside handleStatusUpdate function
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const retrievedValue = getLocalStorageWithExpiry("userId");
      const token = retrievedValue?.token;
      const response = await axios.put(
        `https://zk-backend.vercel.app/jobPosts/select-applicant/${applicationId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          params: {
            status, // Pass the status as a query parameter
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      // Show success toast
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      // Show error toast
      toast.error("Error updating status");
    } finally {
      setUpdatingStatusForAppId(null);
      setStatusDropdownVisible(false);
    }
  };

  const name = userdata?.username;

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="hero2 md:py-[150px] py-[180px]">
          <div>
            <DashNav />
          </div>

          <div className="mb-48">
            <h1 className="text-center text-white font-extrabold md:text-[48px] text-[30px] leading-6 font-agrandir">
              Applied Applicants
            </h1>

            <div className="md:px-[100px] md:py-[50px] pt-[10px] px-[10px]">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light text-white">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th
                              scope="col"
                              className="md:px-6 md:py-4 py-2 px-3"
                            >
                              Rank
                            </th>
                            <th
                              scope="col"
                              className="md:px-6 md:py-4 py-2 px-3"
                            >
                              Name{" "}
                            </th>
                            <th
                              scope="col"
                              className="md:px-6 md:py-4 py-2 px-3"
                            >
                              Resume
                            </th>
                            <th
                              scope="col"
                              className="md:px-6 md:py-4 py-2 px-3"
                            >
                              View Details
                            </th>
                            <th
                              scope="col"
                              className="md:px-6 md:py-4 py-2 px-3"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="rounded-xl">
                          {jobDetails ? (
                            <>
                              {jobDetails?.map((data, index) => (
                                <tr
                                  key={data._id}
                                  className="border transition duration-300 ease-in-out hover:text-black hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 mb-[25px] p-[30px] rounded-3xl"
                                >
                                  <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3 font-medium">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                    {data.username}
                                  </td>
                                  <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                                    {" "}
                                    <IoMdCloudUpload size={32} color="blue" />
                                  </td>
                                  <td className="whitespace-nowrap underline text-gray-600 md:px-6 md:py-4 py-2 px-3">
                                    View Details
                                  </td>

                                  <td className="whitespace-nowrap flex gap-3 md:px-6 md:py-4 py-2 px-3">
                                    {updatingStatusForAppId !== data._id && (
                                      <button
                                        onClick={() =>
                                          setUpdatingStatusForAppId(data._id)
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                      >
                                        Update Status
                                      </button>
                                    )}
                                    {updatingStatusForAppId === data._id && (
                                      <div className="mt-2 flex gap-2">
                                        <button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              data._id,
                                              "selected"
                                            )
                                          }
                                          className="bg-green-500 text-white px-2 py-1 rounded-md"
                                        >
                                          Accept
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              data._id,
                                              "rejected"
                                            )
                                          }
                                          className="bg-red-500 text-white px-2 py-1 rounded-md"
                                        >
                                          Reject
                                        </button>
                                        <button
                                          onClick={() => {
                                            setUpdatingStatusForAppId(null);
                                            setStatusDropdownVisible(false);
                                          }}
                                          className="bg-gray-500 text-white px-2 py-1 rounded-md"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <>No Job Details Available</>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
