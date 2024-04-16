import { useAppSelector } from "@/store/redux-hook";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
// import Container from "./Container";
const Container = dynamic(() => import("./Container"), { ssr: false });

function VoiceCall() {
  const { voiceCall, socket, userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (voiceCall?.type === "out-going") {
      socket.current.emit("outgoing-voice-call", {
        to: voiceCall?.id,
        from: {
          id: userInfo?.id,
          profilePicture: userInfo?.profileImage,
          name: userInfo?.name,
        },
        callType: voiceCall?.callType,
        roomId: voiceCall?.roomId,
      });
    }
  }, [
    socket,
    userInfo?.id,
    userInfo?.name,
    userInfo?.profileImage,
    voiceCall?.callType,
    voiceCall?.id,
    voiceCall?.roomId,
    voiceCall?.type,
  ]);

  return <Container data={voiceCall} />;
}

export default VoiceCall;
