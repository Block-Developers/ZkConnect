import React from "react";

const CustomFormComp = ({ name, type }) => {
  return (
    <div className="flex flex-col md:w-full  md:mt-[50px] mt-[30px]">
      <div className="text-[24px] leading-6 font-agrandir pb-3 cursor-pointer text-white">
        {name}
      </div>
      <div>
        <input
          className="bg-transparent border rounded-xl placeholder:text-white placeholder:text-opacity-20 text-white active:text-white md:px-3 px-1 py-2 w-full"
          type={type}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default CustomFormComp;
