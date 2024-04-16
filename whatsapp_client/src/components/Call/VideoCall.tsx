import { useAppSelector } from "@/store/redux-hook";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Container from "./Container";
// const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  const { videoCall, socket, userInfo } = useAppSelector((state) => state.user);


  useEffect(() => {
    if (videoCall?.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo?.id,
          profilePicture: userInfo?.profileImage,
          name: userInfo?.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [
    socket,
    userInfo?.id,
    userInfo?.name,
    userInfo?.profileImage,
    videoCall?.callType,
    videoCall?.id,
    videoCall?.roomId,
    videoCall?.type,
  ]);

  return <Container data={videoCall} />;
}

export default VideoCall;
