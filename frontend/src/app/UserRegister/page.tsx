"use client";
import React, { useEffect, useState } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import CustomFormComp from "../components/CustomFormComp";
import CustomTextBox from "../components/CustomTextBox";
import CustomNav from "../components/customNav";
import CustomFileUpload from "../components/CustomFileUpload";
import axios from "axios";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook
export default function Starting(): JSX.Element {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [resume, setResume] = useState(null); // Initialize the state variable for the resume file
  const [profileBio, setProfileBio] = useState(""); // Initialize the state variable for the text area
  const [loading, setLoading] = useState(true); // Initialize loading state


  const [account, setAccount] = useState(''); // Initialize account state variable
// State variables to hold form inputs
const [names, setName] = useState('');
const [experience, setExperience] = useState('');
const [designation, setDesignation] = useState('');
  const router = useRouter(); // Initialize the router

  const [modalVisible, setModalVisible] = useState(false);
  // ... (other state and effects)

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleMintNFT = async () => {
    // Call your mint function here with the form inputs
    // For example: mint(name, experience, designation, account);
    console.log('Minting NFT with the following details:', { account, name, experience, designation });
let a = account;
    const res = await mint({
      account,name, designation, experience });

      console.log(res);

      if(res){
        router.push("/");
      }
  };



  const handleProfileBioChange = (event) => {
    const value = event.target.value;
    setProfileBio(value);
  };

  const handleResumeChange = (file) => {
    setResume(file);
  };

  const handleButtonClick = (buttonId: number): void => {
    setSelectedButton(buttonId);
  };

  const handleSkillSelect = (buttonId: number): void => {
    if (selectedSkills.includes(buttonId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== buttonId));
    } else {
      setSelectedSkills([...selectedSkills, buttonId]);
    }
  };
  useEffect(() => {
    // Check if there is a token in localStorage
    const id = getLocalStorageWithExpiry("userId");
    if (!id || !id.token) {
      // If no token, redirect to the login page
      router.push("/Login");
    } else if (
      id.user.userregister.length !== 0 &&
      id.user.companyregister.length !== 0
    ) {
      router.push("/Login");
    } else {
      setLoading(false);
    }
  }, []);
 // Function to connect wallet
 const connectWallet = async () => {
  if (window.ethereum) {
    // Initialize web3 instance
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Set state
      setAccount(accounts[0]);
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    // Initialize web3 instance
    const web3 = new Web3(window.web3.currentProvider);
    // Fetch accounts
    const accounts = await web3.eth.getAccounts();
    // Set state
    setAccount(accounts[0]);
  } else {
    window.alert('Non-Ethereum browser detected. Consider installing MetaMask!');
  }
};
  const handleFormSubmit = async (): Promise<void> => {
    const formData = new FormData();
    formData.append("file", resume);
    const id = getLocalStorageWithExpiry("userId");
    console.log(id.token, "id");
    const token = id.token;

    const response = await axios.post(
      "https://zk-backend.vercel.app/auth/registerUser",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: location,
        contactNumber: contactNumber,
        profileBio: profileBio,
        resume: resume.name,
        selectedButton: selectedButton,
        selectedSkills: selectedSkills.join(", "),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("Response:", response.data);
    if (response.status === 200 || 201 || 202 || 203 || 204) {
      // Successful login

      toast.success("User Registered Successfully!", { autoClose: 4000 });
      // Store the id value in localStorage

      window.location.href = "/UserDashboard";
    } else {
      // Error handling for unsuccessful login

      // Handle the response as needed
      console.log("Missing Values");
    }
  };

  return (
    <div className="hero2">
      {loading ? ( // Use loading state to conditionally render content
        <div>Loading...</div> // Display loading message or spinner
      ) : (
        <>
          <div>
            <CustomNav />
          </div>
          <div className="pb-20">
            <center className="mt-[80px] py-12  flex justify-center items-center text-white w-full ">
              Hi there!👋 <br /> Let&apos;s get started
            </center>
            <div className="flex flex-col mx-6  md:mx-[150px]   md:mt-[20px] border px-6 md:p-[100px] border-white rounded-2xl text-white md:text-[24px] leading-6 font-agrandir">
              <div className="flex flex-row gap-4">
                <CustomFormComp
                  name="First Name"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <CustomFormComp
                  name="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </div>
              <CustomFormComp
                name="Email - ID"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <CustomFormComp
                name="Location"
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
              <CustomFormComp
                name="Contact Number"
                type="number"
                value={contactNumber}
                onChange={(event) => {
                  setContactNumber(event.target.value);
                }}
              />

              <CustomTextBox
                name="Profile Bio"
                placeholder="Tell us about you"
                value={profileBio}
                onChange={handleProfileBioChange}
              />

              <CustomFileUpload
                name="Resume"
                type="file"
                accepted="application/pdf"
                onChange={handleResumeChange}
              />

              <div className="flex flex-col mt-5 md:mt-[50px]">
                <div className="md:text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
                  Type
                </div>
                <div className="flex pt-2 gap-3">
                  <button
                    className={`rounded-[10px] border border-white md:px-5 hover:bg-[#DB00FF] px-2 py-1 md:py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedButton === 1 ? "bg-blue-500" : "bg-transparent"
                    }`}
                    onClick={() => handleButtonClick(1)}
                  >
                    Student
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 hover:bg-[#DB00FF] md:py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedButton === 2 ? "bg-blue-500" : "bg-transparent"
                    }`}
                    onClick={() => handleButtonClick(2)}
                  >
                    Fresher
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 hover:bg-[#DB00FF] md:text-[24px] leading-6 font-agrandir ${
                      selectedButton === 3 ? "bg-blue-500" : "bg-transparent"
                    }`}
                    onClick={() => handleButtonClick(3)}
                  >
                    Working Profession
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-[50px]">
                <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
                  Skills
                </div>
                <div className="flex flex-wrap pt-2 gap-3">
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(1)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(1)}
                  >
                    Full Stack
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(2)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(2)}
                  >
                    Frontend
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(3)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(3)}
                  >
                    Backend
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(4)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(4)}
                  >
                    Designer
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(5)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(5)}
                  >
                    Smart contract developer
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(6)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(6)}
                  >
                    Social Media
                  </button>
                  <button
                    className={`rounded-[10px] border border-white px-2 md:px-5 py-3 md:text-[24px] leading-6 font-agrandir ${
                      selectedSkills.includes(7)
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleSkillSelect(7)}
                  >
                    Content Writer
                  </button>
                </div>
              </div>

<div className="my-5">
<h1 className="text-left text-white text-3xl font-sans" >NFT</h1>
</div>

              <div className="py-5">

              <div style={{ zIndex: 999999 }}>
        <button onClick={toggleModal} className="border px-5 py-2 rounded-lg hover:bg-black hover:text-white">Mint Your Identity</button>
      </div>
          {/* Modal */}
          {modalVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000000, // Very high z-index
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <div style={{
          
            padding: '20px',
            borderRadius: '10px'
          }} className="w-[780px] h-[680px] bg-black bg-opacity-95">
          
            <button onClick={toggleModal} style={{ color: 'white' }}>Close</button>

            <div className="p-[50px]">
              <div className="pt-[20px]">
                <h1 className="text-[#CA00EB] font-sans text-center text-[45px] font-semibold leading-[48px]">
                Claim your NFT
                </h1>
              </div>

              <div className="pt-[15px] px-[0px]">
<div className="flex flex-col">
<h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">Name
  </h1>
  <div className="py-2 pb-4">
    <input type="text" name="" id="" value={names} 
            onChange={(e) => setName(e.target.value)}   className="w-[550px] h-[45px] rounded-[10px] border placeholder:px-5 "/></div></div>

    <div className="flex flex-col">
<h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">Experience
  </h1>
  <div className="py-2 pb-4">
    <input type="text" name="" id=""  value={experience} 
            onChange={(e) => setExperience(e.target.value)}  className="w-[550px] h-[45px] rounded-[10px] border"/></div></div>

    <div className="flex flex-col">
<h1 className="text-white text-[20px] font-agrandir font-normal leading-[20px] ">Designation
  </h1>
  <div className="py-2">
    <input type="text" name="" id=""        value={designation} 
            onChange={(e) => setDesignation(e.target.value)}  className="w-[550px] h-[45px] rounded-[10px] border"/></div></div>
              </div>

              <div className="flex justify-center items-center pt-6 ">
                {
                  account ? (<div className="text-white text-center font-agrandir text-[20px] pb-10">Connected: {account}
                  <div className="flex justify-center items-center pt-8">
                  <button onClick={handleMintNFT} className="text-white text-center bg-[#7D088F]  border px-4 py-3 rounded-xl">
                    Claim your NFT
                  </button>
                  </div>
                  </div>) : (
                    <button onClick={connectWallet} className="text-white border px-4 py-3 rounded-xl">
                    Connect wallet
                  </button>
                  )
                }
   
              </div>

              
            </div>
          </div>
        </div>
      )}
              </div>

              <button
                onClick={handleFormSubmit}
                className="flex justify-center rounded-lg items-center mt-5 mb-10  md:mt-[50px] cursor-pointer bg-[#DB00FF87] bg-opacity-[53%] py-5"
              >
                Continue ➡️
              </button>
              <ToastContainer />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
