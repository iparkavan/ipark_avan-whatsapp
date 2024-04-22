import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setEndCall } from "@/store/userSlice";
import { GET_CALL_TOKEN } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

interface ContainerProps {
  data:
    | {
        id: number;
        name: string;
        email: string;
        profilePicture: string;
        type: "out-going" | "in-coming";
        callType: "voice" | "video";
        roomId: number;
      }
    | undefined;
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zegVar, setZegVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publicStream, setPublicStream] = useState(undefined);
  const { userInfo, socket } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.type === "out-going")
      socket.current.on("accepted-call", () => setCallAccepted(true));
    else {
      setTimeout(() => setCallAccepted(true), 1000);
    }
  }, [data?.type, socket]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get(`${GET_CALL_TOKEN}/${userInfo?.id}`);
        console.log(returnedToken);
        setToken(returnedToken);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [userInfo?.id]);

  useEffect(() => {
    const startCall = async () => {
      import("zego-express-engine-webrtc").then(
        async ({ ZegoExpressEngine }) => {
          const zg = new ZegoExpressEngine(
            process.env.NEXT_PUBLIC_ZEGO_APP_ID,
            process.env.NEXT_PUBLIC_ZEGO_SERVER_ID
          );
          setZegVar(zg);

          zg.on(
            "roomStreamUpdate",
            async (roomId, updateType, streamList, extendedData) => {
              if (updateType === "ADD") {
                const rmVideo = document.getElementById("remote-video");
                const vd = document.createElement(
                  data?.callType === "video" ? "video" : "audio"
                );
                vd.id = streamList[0].streamID;
                vd.autoplay = true;
                // vd.playsInline = true;
                vd.muted = false;
                if (rmVideo) {
                  rmVideo.appendChild(vd);
                }
                zg.startPlayingStream(streamList[0].streamID, {
                  audio: true,
                  video: false,
                }).then((stream) => (vd.srcObject = stream));
              } else if (
                updateType === "DELETE" &&
                zg &&
                localStream &&
                streamList[0].streamID
              ) {
                zg.destroyStream(localStream);
                zg.stopPublishingStream(streamList[0].streamID);
                zg.logoutRoom(data?.roomId.toString());
                dispatch(setEndCall({}));
              }
            }
          );

          await zg.loginRoom(
            data?.roomId.toString(),
            token,
            {
              userID: userInfo?.id.toString(),
              userName: userInfo?.name,
            },
            { userUpdate: true }
          );

          const localStream = await zg.createStream({
            camera: {
              audio: true,
              video: data?.callType === "video" ? true : false,
            },
          });
          const locaVideo = document.getElementById("local-audio");
          const videoElement = document.createElement(
            data?.callType === "video" ? "video" : "audio"
          );
          videoElement.id = "video-local-zego";
          videoElement.className = "h-28 w-32";
          videoElement.autoplay = true;
          videoElement.muted = false;

          videoElement.playsInline = true;

          // locaVideo?.appendChild(videoElement);
          locaVideo?.appendChild(videoElement);

          const td = document.getElementById("video-local-zego");
          td.srcObject = localStream;
          const streamId = "123" + Date.now();
          setPublicStream(streamId);
          setLocalStream(localStream);
          zg.startPublishingStream(streamId, localStream);
        }
      );
    };
    if (token) {
      startCall();
    }
  }, [
    data?.callType,
    data?.roomId,
    dispatch,
    localStream,
    token,
    userInfo?.id,
    userInfo?.name,
  ]);

  const endCall = () => {
    if (zegVar && localStream && publicStream) {
      zegVar.destroyStream(localStream);
      zegVar.stopPublishingStream(publicStream);
      zegVar.logoutRoom(data?.roomId.toString());
    }
    if (data?.callType === "voice") {
      socket.current.emit("reject-voice-call", {
        from: data?.id,
      });
    } else {
      socket.current.emit("reject-video-call", {
        from: data?.id,
      });
    }

    dispatch(setEndCall({}));
  };

  return (
    <div className="w-full bg-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl">{data?.name}</span>
        <span className="text-lg">
          {callAccepted && data?.callType !== "video"
            ? "On Going Call"
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || data?.callType === "voice") && (
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
      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-5 right-5" id="local-audio"></div>
      </div>
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
