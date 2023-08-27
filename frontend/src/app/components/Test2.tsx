import React from "react";

const Test2: React.FC = () => {
  const q = {
    color: "#CA00EB",
    fontFamily: "Poppins",
    fontSize: "25px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "59px",
  };

  return (
    <div className="zkhero ">
      <div className="flex">
        <div className="flex flex-col">
          <div>
            <h1 style={q}>Question 1</h1>
          </div>
        </div>
        <div>{/* Add your content here */}</div>
      </div>
    </div>
  );
};

export default Test2;
