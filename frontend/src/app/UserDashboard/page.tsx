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
import { AiOutlineSearch } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";

import { mint } from "../../../blockchain";

import Web3 from "web3"; // Import Web3 so it can be used in the component

export default function UserDashboard() {
  const [userdata, setUserdata] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [account, setAccount] = useState(""); // Initialize account state variable
  // State variables to hold form inputs
  const [names, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [designation, setDesignation] = useState("");
  const router = useRouter(); // Initialize the router

  const [modalVisible, setModalVisible] = useState(false);
  // ... (other state and effects)

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleMintNFT = async () => {
    // Call your mint function here with the form inputs
    // For example: mint(name, experience, designation, account);
    console.log("Minting NFT with the following details:", {
      account,
      name,
      experience,
      designation,
    });
    let a = account;
    const res = await mint({
      account,
      name,
      designation,
      experience,
    });

    console.log(res);

    if (res) {
      router.push("/");
    }
  };

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

  // Function to connect wallet
  const connectWallet = async () => {
    if (window?.ethereum) {
      // Initialize web3 instance
      const web3 = new Web3(window?.ethereum);
      try {
        // Request account access
        const accounts = await window?.ethereum?.request({
          method: "eth_requestAccounts",
        });
        // Set state
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else if (window?.web3) {
      // Initialize web3 instance
      const web3 = new Web3(window?.web3?.currentProvider);
      // Fetch accounts
      const accounts = await web3?.eth?.getAccounts();
      // Set state
      setAccount(accounts[0]);
    } else {
      window?.alert(
        "Non-Ethereum browser detected. Consider installing MetaMask!"
      );
    }
  };

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
                    <div className="flex space-x-2 ">
                      <div className="py-3 flex text-center text-[18px] leading-6 font-agrandir justify-start items-center gap-2 cursor-pointer">
                        <AiOutlineSearch className="w-8 h-8" />
                        <input
                          type="text"
                          className="bg-none w-36 text-white bg-[#0000008F] bg-opacity-50  outline-none"
                          placeholder="Find Job Here"
                        />
                      </div>
                      <div className="  flex text-center text-[18px] leading-6 font-agrandir justify-start items-center gap-2 cursor-pointer">
                        {" "}
                        <SlLocationPin className="w-8 h-8 text-white" />
                        <input
                          type="text"
                          className="bg-none w-36 text-white bg-[#0000008F] bg-opacity-50  outline-none"
                          placeholder="Chennai, India"
                        />
                      </div>
                      <button className=" px-5 my-2  bg-[#640074] text-white rounded-3xl flex text-center text-[18px] leading-6 font-agrandir justify-start items-center gap-4 cursor-pointer">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ zIndex: 999999 }}>
                <button onClick={toggleModal}>Mint Your Identity</button>
              </div>
              {/* Modal */}
              {modalVisible && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1000000, // Very high z-index
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                    className="w-[780px] h-[680px] bg-black bg-opacity-95"
                  >
                    <h2 style={{ color: "white" }}>Mint Your Identity</h2>
                    <button onClick={toggleModal} style={{ color: "white" }}>
                      Close
                    </button>

                    <div className="p-[50px]">
                      <div className="pt-[20px]">
                        <h1 className="text-[#CA00EB] font-sans text-center text-[45px] font-semibold leading-[48px]">
                          Claim your NFT
                        </h1>
                      </div>

                      <div className="pt-[15px] px-[0px]">
                        <div className="flex flex-col">
                          <h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">
                            Name
                          </h1>
                          <div className="py-2 pb-4">
                            <input
                              type="text"
                              name=""
                              id=""
                              value={names}
                              onChange={(e) => setName(e.target.value)}
                              className="w-[550px] h-[45px] rounded-[10px] border placeholder:px-5 "
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">
                            Experience
                          </h1>
                          <div className="py-2 pb-4">
                            <input
                              type="text"
                              name=""
                              id=""
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              className="w-[550px] h-[45px] rounded-[10px] border"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">
                            Designation
                          </h1>
                          <div className="py-2">
                            <input
                              type="text"
                              name=""
                              id=""
                              value={designation}
                              onChange={(e) => setDesignation(e.target.value)}
                              className="w-[550px] h-[45px] rounded-[10px] border"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center pt-6 ">
                        {account ? (
                          <div className="text-white text-center font-agrandir text-[20px] pb-10">
                            Connected: {account}
                            <div className="flex justify-center items-center pt-8">
                              <button
                                onClick={handleMintNFT}
                                className="text-white text-center bg-[#7D088F]  border px-4 py-3 rounded-xl"
                              >
                                Claim your NFT
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={connectWallet}
                            className="text-white border px-4 py-3 rounded-xl"
                          >
                            Connect wallet
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
