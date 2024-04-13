import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setMessagesSearch } from "@/store/userSlice";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { messageProps } from "./ChatContainer";

function SearchMessages() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<messageProps[]>([]);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const messages = useAppSelector((state) => state.user.messages);

  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        messages.filter(
          (message: messageProps) =>
            message.type === "text" && message.message.includes(searchTerm)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [messages, searchTerm]);

  return (
    <div className="border-conversation-border border-1 w-full bg-[#ffffff] flex flex-col z-10 max-h-screen">
      <div className="h-14 px-4 py-5 flex gap-10 items-center bg-[#f0f2f5] text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={() => dispatch(setMessagesSearch({}))}
        />
        <span className="text-black">Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-[#f0f2f5] flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
              <div className="flex text-[#54656f] gap-2 items-center justify-center">
                <BiSearchAlt2 className="cursor-pointer text-xl text-[#54656f]" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search Messages"
                  className="bg-transparent text-sm focus:outline-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="mt-10 text-black">
            {!searchTerm.length &&
              `Search for messages with ${currentChatUser?.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {searchTerm.length > 0 && !searchedMessages.length && (
            <span className="text-black w-full flex justify-center">
              No Messages found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages.map((message: messageProps, index) => (
              <div
                key={index}
                className="flex cursor-pointer flex-col justify-center hover:bg-[#ced0d1] w-full px-5 border-b-[0.1px] border-secondary py-5"
              >
                <div className="text-sm text-secondary">
                  {calculateTime(message.createdAt)}
                </div>
                <div className="text-icon-green">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
