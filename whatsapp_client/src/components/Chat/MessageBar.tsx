import { ADD_MESSAGES } from "@/store/action.type";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { addMessage, setMessages } from "@/store/userSlice";
import {
  ADD_IMAGE_MESSAGE_ROUTE,
  ADD_MESSAGE_ROUTE,
  HOST,
} from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { Socket, io } from "socket.io-client";
import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react";
import { GetEmojiUrl } from "emoji-picker-react/dist/components/emoji/BaseEmojiProps";
import PhotoPicker from "../common/PhotoPicker";

interface emojiDataProps {
  unified: string;
  emojiStyle?: EmojiStyle;
  size?: number;
  lazyLoad?: boolean;
  getEmojiUrl?: GetEmojiUrl;
  emojiUrl?: string;
}

function MessageBar() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const socket = useAppSelector((state) => state.user.socket);
  const dispatch = useAppDispatch();

  // console.log("SOCKET", socket.socket);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [grabPhoto, setGrabPhoto] = useState(false);

  const emojiPickerRef = useRef<HTMLInputElement>(null);

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event: any) => {
    setMessage((prevMessage) => (prevMessage += event.emoji));
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(HOST);
  const sendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });

      socket?.socket?.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });

      dispatch(
        addMessage({
          type: ADD_MESSAGES,
          addMessage: { ...data.message },
          fromSelf: true,
        })
      );

      setMessage("");
    } catch (error) {
      console.log(error);
    }
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

  const photoPickerChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement> | FileList
  ) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo?.id,
          to: currentChatUser?.id,
        },
      });

      if (response.status === 201) {
        socket?.socket?.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });

        dispatch(
          addMessage({
            type: ADD_MESSAGES,
            addMessage: { ...response.data.message },
            fromSelf: true,
          })
        );
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-32 px-4 gap-6">
      <div className="flex gap-6">
        <BsEmojiSmile
          className="cursor-pointer text-xl text-[#54656f]"
          title="Emoji"
          id="emoji-open"
          onClick={handleEmojiModal}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-24 left-42 z-40" ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={(event, emoji) => handleEmojiClick(event)}
            />
          </div>
        )}
        <ImAttachment
          className="cursor-pointer text-xl text-[#54656f]"
          title="Attach File"
          onClick={() => setGrabPhoto(true)}
        />
      </div>
      {grabPhoto && <PhotoPicker onChange={photoPickerChangeHandler} />}
      <div className="w-full flex items-center rounded-lg h-10">
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#ffffff] text-sm focus:outline-none h-10 rounded-lg px-5 py-4 w-full"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className="flex-center w-10">
        <button>
          <MdSend
            className="cursor-pointer text-xl text-[#54656f]"
            title="Send Message"
            onClick={sendMessage}
          />
          {/* <FaMicrophone
              className="cursor-pointer text-xl text-[#54656f]"
              title="Record"
            /> */}
        </button>
      </div>
    </div>
  );
}

export default MessageBar;
