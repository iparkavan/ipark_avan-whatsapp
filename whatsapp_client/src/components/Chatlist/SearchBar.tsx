import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";

function SearchBar() {
  return (
    <div className="bg-[#ffffff] flex py-3 pl-3 items-center gap-3 h-12 border border-gray-100">
      <div className="bg-[#f0f2f5] flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div className="flex text-[#54656f] gap-2 items-center justify-center">
          <BiSearchAlt2 className="cursor-pointer text-xl text-[#54656f]" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent text-sm focus:outline-none w-full"
          />
        </div>
      </div>
      <div className="pr-4 pl-1">
        <IoFilterOutline />
      </div>
    </div>
  );
}

export default SearchBar;
