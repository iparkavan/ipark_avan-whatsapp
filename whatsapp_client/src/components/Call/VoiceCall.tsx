import { useAppSelector } from "@/store/redux-hook";
import dynamic from "next/dynamic";
import React from "react";
// import Container from "./Container";
const Container = dynamic(() => import("./Container"), { ssr: false });

function VoiceCall() {
  const { voiceCall, socket, userInfo } = useAppSelector((state) => state.user);

  return <Container data={voiceCall} />;
}

export default VoiceCall;
