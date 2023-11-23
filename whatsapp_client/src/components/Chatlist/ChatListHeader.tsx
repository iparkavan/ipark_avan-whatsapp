import React from "react";
import Avatar from "../common/Avatar";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { setAllContactsPage } from "@/store/userSlice";

function ChatListHeader() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const contactsPageHandler = () => {
    dispatch(setAllContactsPage({}));
  };

  return (
    <div className="h-14 px-4 py-3 flex items-center justify-between">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="cursor-pointer text-xl text-[#54656f]"
          title="New Chat"
          onClick={contactsPageHandler}
        />
        <BsThreeDotsVertical
          className="cursor-pointer text-xl text-[#54656f]"
          title="Menu"
        />
      </div>
    </div>
  );
}

export default ChatListHeader;
