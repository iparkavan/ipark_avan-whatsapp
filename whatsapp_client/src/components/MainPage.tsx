import React, { useEffect, useRef, useState } from "react";
import Empty from "./Empty";
import ChatList from "./Chatlist/ChatList";
// import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import Chat from "./Chat/Chat";
import { addMessage, setMessages, setSocket } from "@/store/userSlice";
import { io, Socket } from "socket.io-client";
import { SET_MESSAGES } from "@/store/action.type";

// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

// interface InterServerEvents {
//   ping: () => void;
// }

// interface SocketData {
//   name: string;
//   age: number;
// }

const MainPage = () => {
  // const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  // const socket = useAppSelector((state) => state.user.socket);
  const dispatch = useAppDispatch();
  const [socketEvent, setSocketEvent] = useState(false);

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(HOST);
    if (userInfo) {
      socket.current.emit("add-user", userInfo.id);
      dispatch(setSocket({ socket }));
    }
  }, [dispatch, userInfo, socket]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        alert("Kong");
        console.log(data);
        dispatch(addMessage({ ...data.message }));
      });
      setSocketEvent(true);
    }
  }, [dispatch, socketEvent]);

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
    <div className="flex items-center justify-center pt-5">
      <div className="grid grid-cols-main h-[96vh] w-[94vw] max-h-[98vh] max-w-[95vw] overflow-hidden bg-[#f0f2f5] rounded-md">
        <ChatList />
        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </div>
  );
};

export default MainPage;
