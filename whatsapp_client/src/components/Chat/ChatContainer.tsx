import { useAppSelector } from "@/store/redux-hook";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";

export interface messageProps {
  createdAt: string;
  id: number;
  message: string;
  messageStatus: string;
  receiverId: number;
  senderId: number;
  type: string;
}

function ChatContainer() {
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const messages = useAppSelector((state) => state.user.messages);

  // console.log("All-messages", messages);

  return (
    <div className="bg-chat-background bg-[#efeae2] bg-fixed w-full h-full custom-scrollbar">
      <div className="w-full h-[83vh] relative overflow-auto">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto p-4">
            {messages.map((message: messageProps, index) => (
              <div
                key={message?.id}
                className={`mx-10 ${
                  message?.senderId === currentChatUser?.id
                    ? "flex justify-start"
                    : "flex justify-end"
                }`}
              >
                {message?.type === "text" && (
                  <div
                    className={` inline-block px-3 py-1 rounded-md ${
                      message?.senderId === currentChatUser?.id
                        ? "bg-white"
                        : "bg-[#d9fdd3]"
                    }`}
                  >
                    <span className="break-all">{message?.message}</span>
                    <div className="flex gap-1 justify-end items-end">
                      <span className="text-[#8e9aa2] text-[11px] pt-1 min-w-fit">
                        {calculateTime(message?.createdAt)}
                      </span>
                      <span>
                        {message?.senderId === userInfo?.id && (
                          <MessageStatus
                            messageStatus={message?.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {message.type === "image" && <ImageMessage message={message} />}
                {message.type === "audio" && <VoiceMessage message={message} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
