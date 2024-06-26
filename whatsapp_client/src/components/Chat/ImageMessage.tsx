import { useAppSelector } from "@/store/redux-hook";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import Image from "next/image";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import { messageProps } from "./ChatContainer";

function ImageMessage({ message }) {
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const userInfo = useAppSelector((state) => state.user.userInfo);

  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentChatUser?.id ? "bg-white" : "bg-[#d9fdd3]"
      }`}
    >
      <div className="relative">
        <Image
          src={`${HOST}/${message.message}`}
          className="rounded-lg"
          alt="asset"
          height={300}
          width={300}
        />
        <div className="flex gap-1 justify-end items-end">
          <span className="text-[#8e9aa2] text-[11px] pt-1 min-w-fit">
            {calculateTime(message?.createdAt)}
          </span>
          <span>
            {message?.senderId === userInfo?.id && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
