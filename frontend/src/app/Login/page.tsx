"use client";
import React, { useState } from "react";
import Logo from "../Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import CustomNav from "../components/CustomNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../components/store";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://zk-connect-api.vercel.app/login/",
        {
          username: username,
          password: password,
        }
      );
      console.log(response);

      if (response.status === 200 || 201 || 202 || 203 || 204) {
        // Successful login
        toast.success("Login successful!", { autoClose: 4000 });
        const id = response?.data?.id;

        // Store the id value in localStorage
        setLocalStorageWithExpiry("userId", id, 30);
        const retrievedValue = getLocalStorageWithExpiry("userId"); // Retrieve the stored value (returns null if expired or not found)
        console.log(retrievedValue);
        // const res = await axios.post(
        //   "https://zk-connect-api.vercel.app/get_profile_data",
        //   {
        //     id: id,
        //   }
        // );
        // console.log(res?.data);
        window.location.href = "/Dashboard";
      } else {
        // Error handling for unsuccessful login
        toast.error("Login failed. Please try again.", { autoClose: 4000 });

        // Handle the response as needed
        console.log("Login error");
      }
    } catch (error) {
      // Error handling for network or fetch-related issues
      console.log(error);
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
          <div className="bg-white mx-4 rounded-md py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-center text-xl font-extrabold text-gray-700">
                Welcome Back!
              </h2>
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>

                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <ToastContainer />

            <div className="mt-6">
              <h2 className="mt-6 text-center text-md text-gray-700">
                New to ZkConnect?{" "}
                <Link className="text-indigo-600" href="Signup">
                  Sign Up
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
