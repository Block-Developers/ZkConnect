import { useState } from "react";
import toast from "react-hot-toast";
import { extractGitHubRepoPath, handleError } from "../utils";

export type Inputs = {
  repoLink: string;
};

type FormProps = {
  proveIt: (input: Inputs) => Promise<void>;
};

const Form = ({ proveIt }: FormProps) => {
  const [input, setInput] = useState<Inputs>({
    repoLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const repoFullName = extractGitHubRepoPath(input.repoLink);
    if (!repoFullName) return toast.error("Invalid repository link");
    proveIt(input).catch((e) => console.log(handleError(e)));
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full pt-5 gap-5 lg:items-start text-offBlack"
    >
      <input
        name="repoLink"
        required
        onChange={handleChange}
        value={input.repoLink}
        placeholder="GitHub repo link"
        className="w-full px-5 py-5 lg:py-3 bg-white text-offBlack rounded-xl text-black"
      />

      <button type="submit" className="btn-grad">
        Claim your Identity! 🚀
      </button>
    </form>
  );
};

export default Form;
