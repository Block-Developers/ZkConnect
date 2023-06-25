import React from "react";

const CustomTextBox = ({ name, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col w-full mt-5">
      <div className="md:text-[24px] leading-6 font-agrandir pb-3 cursor-pointer text-white">
        {name}
      </div>
      <div>
        <textarea
          className="bg-transparent border rounded-xl placeholder:text-white placeholder:p-2 text-white active:text-white px-3 py-2 w-full"
          placeholder={placeholder}
          id={name.replace(/\s+/g, "")}
          name={name.replace(/\s+/g, "")}
          rows="7"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomTextBox;
