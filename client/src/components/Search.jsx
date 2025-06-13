import React from "react";

function Search() {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      <input
        type="text"
        placeholder="Search recipe"
        className="w-full bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]"
      />
      <button className="w-[100px] h-[50px] p-2 rounded-md bg-[#54D12B] text-black font-bold cursor-pointer">
        Search
      </button>
    </div>
  );
}

export default Search;
