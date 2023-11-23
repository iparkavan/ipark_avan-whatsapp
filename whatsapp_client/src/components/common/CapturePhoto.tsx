import { trace } from "console";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface props {
  setImage: (value: string) => void;
  hide: (value: boolean) => void;
}

function CapturePhoto({ setImage, hide }: props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  // CHAT GPT helped me write this syntax

  // const handleCaptureClick = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //     });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //   }
  // };
  // handleCaptureClick()
  // }, []);

  useEffect(() => {
    let stream: any;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error: any) {
        console.log(`Error accessing camera: ${error.message}`);
      }
    };

    startCamera();
    return () => {
      stream.getTracks().forEach((track: any) => track.stop());
    };
  }, []);

  const capturePhotoHandler = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL("image/jpeg"));
      hide(false);
    }
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div
          className="p-2 cursor-pointer flex items-end justify-end"
          onClick={() => hide(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="flex justify-center">
          <video id="video" width={"400"} autoPlay ref={videoRef}></video>
        </div>
        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
          onClick={capturePhotoHandler}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
