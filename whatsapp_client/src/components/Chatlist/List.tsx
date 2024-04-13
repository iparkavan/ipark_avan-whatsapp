import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import {
  setFilteredContacts,
  setOnlineUsers,
  setUserContacts,
} from "@/store/userSlice";
import { GET_INITIAL_CONTACT_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";

function List() {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const userContacts = useAppSelector((state) => state.user.userContacts);
  const dispatch = useAppDispatch();
  const filteredContacts = useAppSelector(
    (state) => state.user.filteredContacts
  );

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACT_ROUTE}/${userInfo?.id}`);
        console.log("online", users, onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
        dispatch(setUserContacts(users));
      } catch (error) {}
    };

    if (userInfo?.id) getContacts();
  }, [dispatch, userInfo]);

  return (
    <div className="bg-[#ffffff] flex-auto overflow-auto max-h-full custom-scrollbar">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatLIstItem contact={contact} key={contact.id} />
          ))
        : userContacts.map((contact) => (
            <ChatLIstItem contact={contact} key={contact.id} />
          ))}
    </div>
  );
}

export default List;
