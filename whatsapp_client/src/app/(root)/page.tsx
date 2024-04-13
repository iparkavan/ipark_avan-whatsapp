"use client";

import VideoCall from "@/components/Call/VideoCall";
import VoiceCall from "@/components/Call/VoiceCall";
import Chat from "@/components/Chat/Chat";
import SearchMessages from "@/components/Chat/SearchMessages";
import ChatList from "@/components/Chatlist/ChatList";
import Empty from "@/components/Empty";
import { SET_MESSAGES } from "@/store/action.type";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import {
  addMessage,
  setMessages,
  setSocket,
  setUserInfo,
} from "@/store/userSlice";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isNewUser = useAppSelector((state) => state.user.newUser);
  const dispatch = useAppDispatch();

  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  // const socket = useAppSelector((state) => state.user.socket);
  const [socketEvent, setSocketEvent] = useState(false);
  const socket = useRef<Socket | undefined>(undefined);
  const socketing = useAppSelector((state) => state.user.socket);
  const messageSearch = useAppSelector((state) => state.user.messagesSearch);
  const { voiceCall, videoCall, incomingVideoCall, incomingVoiceCall } =
    useAppSelector((state) => state.user);

  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin, router]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser?.email,
      });
      if (!data?.status) {
        router.push("/login");
      }
      if (data?.data) {
        const {
          id,
          name,
          email,
          profilePicture: profileImage,
          about: status,
        } = data.data;
        dispatch(
          setUserInfo({
            id,
            name,
            email,
            profileImage,
            status,
          })
        );
      }
    }
  });

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch(setSocket(socket));
    }
  }, [dispatch, userInfo, socket]);

  useEffect(() => {
    if (socketing?.current && !socketEvent) {
      socketing.current.on("msg-receive", (data: { message: any }) => {
        // console.log("data on main page", data.message);
        dispatch(addMessage({ addMessage: { ...data.message } }));
      });
      setSocketEvent(true);
    }
  }, [dispatch, socketEvent, socketing]);

  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      const chats = messages.messages;

      dispatch(setMessages({ type: SET_MESSAGES, chats: chats }));
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser?.id, dispatch, userInfo?.id]);

  return (
    <>
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}
      {!videoCall && !voiceCall && (
        <main className="bg-[#e0e0dd] w-full h-screen">
          <div className="bg-[#00a884] w-screen h-32">
            {/* <MainPage /> */}
            <div className="flex items-center justify-center pt-5">
              <div className="grid grid-cols-main h-[96vh] w-[94vw] max-h-[98vh] max-w-[95vw] overflow-hidden bg-[#f0f2f5] rounded-md">
                <ChatList />
                {currentChatUser ? (
                  <div
                    className={
                      messageSearch ? "grid grid-cols-2" : " grid-cols-2"
                    }
                  >
                    <Chat />
                    {messageSearch && <SearchMessages />}
                  </div>
                ) : (
                  <Empty />
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
