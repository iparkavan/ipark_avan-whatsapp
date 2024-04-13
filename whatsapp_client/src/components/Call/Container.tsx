import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setEndCall } from "@/store/userSlice";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";

interface ContainerProps {
  data: {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
    status: string;
    type: string;
    callType: string;
    roomId: number;
  };
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  console.log(data);
  const [callAccepted, setCallAccepted] = useState(false);

  const { userInfo, socket } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const endCall = () => {
    dispatch(setEndCall({}));
  };

  return (
    <div className="w-full bg-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl">{data?.name}</span>
        <span className="text-lg">
          {callAccepted && data?.type === "video" ? "On Going Call" : "Calling"}
        </span>
      </div>
      {(!callAccepted || data?.type === "audio") && (
        <div className="my-24">
          <Image
            src={data?.profilePicture}
            alt="Avatar"
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}

      <div
        className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full cursor-pointer"
        onClick={endCall}
      >
        <MdOutlineCallEnd className="text-3xl " />
      </div>
    </div>
  );
};

export default Container;
