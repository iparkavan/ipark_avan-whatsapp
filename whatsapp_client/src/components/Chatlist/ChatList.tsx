import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";
import { useAppSelector } from "@/store/redux-hook";
import ContactsList from "./ContactsList";

function ChatList() {
  const contactspage = useAppSelector((state) => state.user.contactsPage);
  const [pageType, setPageType] = useState("default");
  // const [newChat, setNewChat] = useState(false);

  useEffect(() => {
    if (contactspage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactspage]);

  return (
    <div className="flex flex-col max-h-screen z-20">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
}

export default ChatList;
