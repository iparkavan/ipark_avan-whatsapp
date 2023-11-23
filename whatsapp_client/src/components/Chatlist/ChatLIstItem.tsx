import React from "react";
import Avatar from "../common/Avatar";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setAllContactsPage, setCurrentChatUser } from "@/store/userSlice";

interface props {
  contact: {
    id: number;
    name: string;
    email: string;
    about: string;
    profilePicture: string;
  };
  isContactPage: boolean;
}

function ChatLIstItem({ contact, isContactPage = false }: props) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const dispatch = useAppDispatch();

  const contactChangeHandler = () => {
    dispatch(setCurrentChatUser({ ...contact }));
    dispatch(setAllContactsPage({}));
  };

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-[#f5f6f6]`}
      onClick={contactChangeHandler}
    >
      <div className="min-w-fit px-5 py-1">
        <Avatar type="lg" image={contact.profilePicture} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span>{contact.name}</span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-3">
          <div className="flex justify-between w-full">
            <span className=" text-[#667781]">{contact.about || "\u00A0"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
