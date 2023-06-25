import MainNav from "../components/mainNav";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";

export default function AppliedApplications() {
  ///for company to track the users applied
  return (
    <section className="hero2 md:py-[150px] py-[180px]">
      <div>
        <MainNav />
      </div>

      <div className="md:mt-[130px] mt-[80px]">
        <h1 className="text-center text-white font-extrabold md:text-[48px] text-[30px] leading-6 font-agrandir">
          Applied Applications
        </h1>

        <div className="md:px-[100px] md:py-[50px] pt-[10px] px-[10px]">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-white ">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Name
                        </th>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Github Link
                        </th>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Contribution
                        </th>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Pull Request
                        </th>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Qualification
                        </th>
                        <th scope="col" className="md:px-6 md:py-4 py-2 px-3">
                          Resume
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-xl">
                      <tr className="border transition duration-300 ease-in-out hover:text-black hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 mb-[25px] p-[30px] rounded-3xl">
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3 font-medium">
                          Thiru
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          https://github.com/Thirumurugan7
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          100
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          54
                        </td>
                        <td className="whitespace-nowrap flex gap-3  md:px-6 md:py-4 py-2 px-3">
                          <FaCheckCircle size={20} color="green" /> Qualified
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          {" "}
                          <IoMdCloudUpload size={32} color="blue" />
                        </td>
                      </tr>
                      <tr className="border transition duration-300 ease-in-out hover:text-black hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 rounded-full">
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3 font-medium">
                          Murugan
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          https://github.com/Thirumurugan8
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          10
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          4
                        </td>
                        <td className="whitespace-nowrap flex gap-3  md:px-6 md:py-4 py-2 px-3">
                          <FaExclamationTriangle size={20} color="green" />{" "}
                          Failed
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          {" "}
                          <IoMdCloudUpload size={32} color="blue" />
                        </td>
                      </tr>
                      <tr className="border transition duration-300 ease-in-out hover:text-black hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3 font-medium">
                          Vm
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          https://github.com/Vmmuthu31
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          190
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          40
                        </td>
                        <td className="whitespace-nowrap flex gap-3  md:px-6 md:py-4 py-2 px-3">
                          <FaCheckCircle size={20} color="green" /> Qualified
                        </td>
                        <td className="whitespace-nowrap md:px-6 md:py-4 py-2 px-3">
                          {" "}
                          <IoMdCloudUpload size={32} color="blue" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
