import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import ChatList from "./Chatlist/ChatList";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { setUserInfo } from "@/store/userSlice";
import Chat from "./Chat/Chat";

const MainPage = () => {
  // const router = useRouter();
  // const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);

  // console.log("userinfo", userInfo);

  // useEffect(() => {
  //     if (!isNewUser && userInfo?.email) {
  //       router.push("/");
  //     } else if (isNewUser && !userInfo?.email) {
  //       router.push("/login");
  //     }
  //   }, [isNewUser, router, userInfo?.email]);

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
