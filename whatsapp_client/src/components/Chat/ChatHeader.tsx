import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "@/store/redux-hook";

function ChatHeader() {
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);

  return (
    <div className="h-14 px-4 py-3 flex justify-between items-center bg-[#f0f2f5] z-10">
      <div className="flex-center gap-6">
        <Avatar type="sm" image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span>{currentChatUser?.name}</span>
          <span className="text-[#667781]">Online/Offline</span>
        </div>
      </div>

      <div className="flex gap-6">
        <MdCall className="cursor-pointer text-xl text-[#54656f]" />
        <IoVideocam className="cursor-pointer text-xl text-[#54656f]" />
        <BiSearchAlt2 className="cursor-pointer text-xl text-[#54656f]" />
        <BsThreeDotsVertical className="cursor-pointer text-xl text-[#54656f]" />
      </div>
    </div>
  );
}

export default ChatHeader;
