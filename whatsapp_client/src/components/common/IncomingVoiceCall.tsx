import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import {
  setEndCall,
  setIncomingVoiceCall,
  setVoiceCall,
} from "@/store/userSlice";
import Image from "next/image";
import React from "react";

const IncomingVoiceCall = () => {
  const { incomingVoiceCall, socket, userInfo } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch(); 

  const acceptCall = () => {
    dispatch(setVoiceCall({ ...incomingVoiceCall, callType: "in-coming" }));
    socket.current.emit("accept-incoming-call", {
      id: incomingVoiceCall?.id,
    });
    dispatch(setIncomingVoiceCall(undefined));
  };
  const rejectCall = () => {
    dispatch(setEndCall({}));
    socket.current.emit("reject-video-call", {
      from: incomingVoiceCall?.id,
    });
  }; 

  return (
    <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-center p-4 bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-14">
      <div>
        <Image
          src={incomingVoiceCall?.profilePicture}
          alt="avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{incomingVoiceCall?.name}</div>
        <div className="text-sm">Incoming Voice Call</div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
            onClick={rejectCall}
          >
            Reject
          </button> 

          <button
            className="bg-green-500 p-1 px-3 text-sm rounded-full"
            onClick={acceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingVoiceCall;
