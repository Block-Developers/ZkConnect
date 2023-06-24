import React from "react";
import Logo from "../Images/logo.png";
import Image from "next/image";

function CustomNav() {
  return (
    <div className="mb-2">
      {" "}
      <header className="absolute inset-x-0 top-0  z-50 bg:gray-700">
        <nav
          className="flex items-center justify-center p-2 "
          aria-label="Global"
        >
          <div className="">
            <div className="flex">
              <Image className="h-16 w-auto" src={Logo} alt="" />
              <p className="text-white text-2xl font-bold p-4">ZKConnect</p>
            </div>
          </div>
        </nav>
        <hr className="text-white" />
      </header>
    </div>
  );
}

export default CustomNav;
