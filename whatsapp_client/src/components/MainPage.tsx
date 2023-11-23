import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import ChatList from "./Chatlist/ChatList";
// import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import Chat from "./Chat/Chat";

const MainPage = () => {
  // const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      console.log({ data });
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser?.id, userInfo?.id]);

  return (
    <div className="flex items-center justify-center pt-5">
      <div className="grid grid-cols-main h-[96vh] w-[94vw] max-h-[98vh] max-w-[95vw] overflow-hidden bg-[#f0f2f5] rounded-md">
        <ChatList />
        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </div>
  );
};

export default MainPage;
