"use client";
import React, { useState } from "react";
import Logo from "../Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { TfiUser } from "react-icons/tfi";
import { FaBullhorn } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";
import CustomNav from "../components/customNav";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState(""); // Add companyName state

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!username || !email || !password || !role) {
      // Display an error message or perform desired actions for validation failure
      console.log("Please fill in all the fields.");
      return;
    }

    try {
      // Send a POST request to the signup endpoint
      const response = await axios.post(
        "https://zk-backend.vercel.app/auth/signup/",
        {
          username: username,
          password: password,
          email: email,
          role: role,
          companyName: role === "company" ? companyName : false, // Add companyName if role is "recruiter"
        }
      );

      if (response.status === 200 || 201 || 202 || 203 || 204) {
        // Successful login
        toast.success("Signup successful!", { autoClose: 4000 });
        window.location.href = "/Login";
      } else {
        toast.error("Signup Failed!", { autoClose: 4000 });
      }
      // Rest of your code...
    } catch (error) {
      // Handle any network or server errors
      toast.error("UserName or email ID is already taken!", {
        autoClose: 4000,
      });
      console.log("An error occurred:", error);
    }
  };
  return (
    <div>
      <CustomNav />
      <div className="min-h-full flex flex-col justify-center py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto mt-2 h-32 w-auto"
            src={Logo}
            alt="Workflow"
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 mx-4 rounded-md shadow sm:rounded-lg sm:px-10">
            {role === "" ? (
              <div>
                <h2 className="text-center text-xl font-extrabold text-gray-700">
                  Choose your role
                </h2>
                <div className="flex justify-center mt-4">
                  <div className="flex justify-center flex-col">
                    <TfiUser className="h-20 w-20 m-4" />
                    <button
                      className="mx-2 py-2 px-4 bg-indigo-600 text-white rounded-md"
                      onClick={() => handleRoleSelect("candidate")}
                    >
                      Candidate
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <FaBullhorn className="h-20 w-20 m-4" />
                    <button
                      className="mx-2 py-2 px-4 bg-indigo-600 text-white rounded-md"
                      onClick={() => handleRoleSelect("company")}
                    >
                      Recruiter
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-center text-xl font-extrabold text-gray-700">
                  Sign up to create your account
                </h2>
                {role === "company" && ( // Show companyName input only for recruiter role
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="companyName"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center"></div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            )}
            <ToastContainer />
            <h2 className="mt-6 text-center text-md  text-gray-700">
              Already have an account on ZkConnect?{" "}
              <Link className="text-indigo-600" href="Login">
                Login
              </Link>
            </h2>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
