import React from "react";

const CustomTextBox = ({ name, placeholder }) => {
  return (
    <div className="flex flex-col w-full mt-5">
      <div className="md:text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
        {name}
      </div>
      <div>
        <textarea
          className="bg-transparent border rounded-xl placeholder:text-white placeholder:p-2 text-white active:text-white px-3 py-2 w-full "
          placeholder={placeholder}
          name=""
          id=""
          rows="7"
        />
      </div>
    </div>
  );
};

export default CustomTextBox;
