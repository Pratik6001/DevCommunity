import { Link } from "react-router-dom";

export default function CompleteProfileCard() {
  return (
    <div className="bg-[#151515] border m-4 space-y-8 border-[#585858] rounded-lg p-5 flex flex-col  ">
      <h2 className="text-white text-left text-lg font-semibold">
        Complete Your Profile
      </h2>
      <p className="text-[#838383] text-left font-semibold text-[16px]">
        Help other developers get to know you better by completing your profile
        with skills and bio.
      </p>
      <Link
        to={"/create-profile"}
        className="bg-white text-black text-sm px-4 py-2 rounded hover:bg-gray-200 transition w-fit"
      >
        Complete Profile
      </Link>
    </div>
  );
}
