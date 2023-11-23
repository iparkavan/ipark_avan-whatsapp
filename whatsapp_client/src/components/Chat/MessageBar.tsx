import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex items-center h-16 px-4 gap-6">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="cursor-pointer text-xl text-[#54656f]"
            title="Emoji"
          />
          <ImAttachment
            className="cursor-pointer text-xl text-[#54656f]"
            title="Attach File"
          />
        </div>
        <div className="w-full flex items-center rounded-lg h-10">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-[#ffffff] text-sm focus:outline-none h-10 rounded-lg px-5 py-4 w-full"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex-center w-10">
          <button>
            <MdSend
              className="cursor-pointer text-xl text-[#54656f]"
              title="Send Message"
              onClick={sendMessage}
            />
            {/* <FaMicrophone
              className="cursor-pointer text-xl text-[#54656f]"
              title="Record"
            /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
