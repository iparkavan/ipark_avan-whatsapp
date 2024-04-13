import React from "react";
import Avatar from "../common/Avatar";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setAllContactsPage, setCurrentChatUser } from "@/store/userSlice";
import { profile } from "console";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";

interface props {
  contact: {
    message: any;
    type: "text" | "audio " | "image";
    messageStatus: string;
    createdAt(createdAt: any): React.ReactNode;
    totalUnreadMessages: any;
    receiverId: number | undefined;
    senderId: number | undefined;
    id: any;
    name?: string;
    email?: string;
    about?: string;
    profilePicture?: string;
  };
  isContactPage: boolean;
}

function ChatLIstItem({ contact, isContactPage = false }: props) {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const currentChatUser = useAppSelector((state) => state.user.currentChatUser);
  const dispatch = useAppDispatch();

  const contactChangeHandler = () => {
    if (!isContactPage) {
      dispatch(
        setCurrentChatUser({
          name: contact.name,
          about: contact.about,
          profilePicture: contact.profilePicture,
          email: contact.email,
          id:
            userInfo?.id === contact.senderId
              ? contact.receiverId
              : contact.senderId,
        })
      );
    } else {
      dispatch(setCurrentChatUser({ ...contact }));
      dispatch(setAllContactsPage({}));
    }
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
          {!isContactPage && (
            <div>
              <span
                className={`${
                  !contact.totalUnreadMessages > 0
                    ? "text-secondary"
                    : "text-icon-green"
                } text-sm`}
              >
                {calculateTime(contact.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-3">
          <div className="flex justify-between w-full">
            <span className=" text-[#667781]">
              {isContactPage ? (
                contact.about || "\u00A0"
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]">
                  {contact.senderId === userInfo?.id && (
                    <MessageStatus messageStatus={contact.messageStatus} />
                  )}
                  {contact.type === "text" && (
                    <span className="truncate">{contact.message}</span>
                  )}
                  {contact.type === "audio " && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-panel-header-icon" />
                      Audio
                    </span>
                  )}
                  {contact.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-panel-header-icon" />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>
            {contact.totalUnreadMessages > 0 && (
              <span className="px-2 text-white bg-icon-green rounded-full">
                {contact.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
