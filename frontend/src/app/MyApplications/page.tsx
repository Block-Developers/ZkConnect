import React from "react";
import MainNav from "../components/mainNav";
function page() {
  return (
    <div className="hero2">
      <MainNav />

      <div className="py-32">
        <div className="flex justify-center items-center  md:text-[40px] font-agrandir font-extrabold leading-6 text-white pt-[80px]">
          {" "}
          <span className="underline">My Applications</span>{" "}
          <span className="no-underline">🚀</span>
        </div>
        <div className="flex justify-center">
          <table className="border-collapse border mt-20 justify-end text-white items-center text-center  border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">
                  Company&apos;s Name
                </th>
                <th className="border border-gray-300 p-2">Profile</th>
                <th className="border border-gray-300 p-2">
                  No. of Application
                </th>
                <th className="border border-gray-300 p-2">
                  Date of Submitting
                </th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Resume</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows with data */}
              <tr>
                <td className="border border-gray-300 p-2">Company A</td>
                <td className="border border-gray-300 p-2">
                  Software Engineer
                </td>
                <td className="border border-gray-300 p-2">10</td>
                <td className="border border-gray-300 p-2">2023-06-25</td>
                <td className="border border-gray-300 p-2">Accepted</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Company B</td>
                <td className="border border-gray-300 p-2">Web Developer</td>
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">2023-06-24</td>
                <td className="border border-gray-300 p-2">Pending</td>
                <td className="border border-gray-300 p-2">Download</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;
