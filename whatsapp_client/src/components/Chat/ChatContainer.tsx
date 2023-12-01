import { useAppSelector } from "@/store/redux-hook";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";

interface message {
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

  return (
    <div className="w-full h-[82vh] relative overflow-auto custom-scrollbar1">
      <div className="bg-chat-background bg-[#efeae2] bg-fixed w-full h-full">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.chats?.map((message: message, index: message) => (
              <div
                key={message.id}
                className={`${
                  message.senderId === currentChatUser?.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`mx-12 inline-block px-3 py-1 rounded-md ${
                      message.senderId === currentChatUser?.id
                        ? "#d9fdd3"
                        : "bg-white"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 justify-end items-end">
                      <span className="text-[#8e9aa2] text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                        {message.senderId === userInfo?.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
