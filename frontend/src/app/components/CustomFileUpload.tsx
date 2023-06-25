import React from "react";

const CustomFileUpload = ({ name, type, accepted, onChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChange(file); // Pass the selected file to the parent component's onChange callback
  };

  return (
    <div className="flex flex-col w-full mt-5">
      <div className="md:text-[24px] leading-6 font-agrandir pb-3 cursor-pointer">
        {name}
      </div>
      <div>
        <input
          className="bg-transparent border rounded-xl placeholder:text-white placeholder:text-opacity-20 text-white active:text-white px-3 py-2 w-full"
          type={type}
          name=""
          id=""
          accept={accepted}
          onChange={handleFileChange} // Use a separate event handler to handle file changes
        />
      </div>
    </div>
  );
};

export default CustomFileUpload;
