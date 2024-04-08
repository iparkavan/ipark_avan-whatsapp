import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

interface props {
  type: string;
  image: string | undefined;
  setImage?: (value: string) => void;
}

function Avatar({ type, image, setImage }: props) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);

  const showContextMenu = (e: any) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setisContextMenuVisible(true);
  };

  const photoPickerChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const fileReader = new FileReader();
    const data = document.createElement("img");

    fileReader.onload = (e: any) => {
      data.src = e.target.result;
      data.setAttribute("data-src", e.target.result);
    };
    fileReader.readAsDataURL(file);
    setTimeout(() => {
      console.log("data.src", data.src);
      setImage(data.src);
    }, 100);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data?.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose Photo",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  return (
    <div className="flex items-center justify-center">
      {type === "sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} alt="Avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "lg" && (
        <div className="relative h-14 w-14">
          <Image src={image} alt="Avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "xl" && (
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex flex-col items-center justify-center z-10 rounded-full text-center gap-2
            ${hover ? "visible" : "hidden"}`}
            onClick={(e) => showContextMenu(e)}
            id="context-opener"
          >
            <FaCamera className="text-2xl text-gray-300" id="context-opener" />
            <span className="text-gray-300" id="context-opener">
              Change <br /> Profile Photo
            </span>
          </div>
          <div className="h-60 w-60" id="context-opener">
            <Image
              src={image}
              alt="Avatar"
              className="rounded-full object-cover"
              fill
            />
          </div>
        </div>
      )}
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          isContextMenuVisible={isContextMenuVisible}
          setisContextMenuVisible={setisContextMenuVisible}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChangeHandler} />}
    </div>
  );
}

export default Avatar;
