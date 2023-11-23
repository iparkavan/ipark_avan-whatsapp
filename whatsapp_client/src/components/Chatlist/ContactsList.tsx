import { useAppDispatch } from "@/store/redux-hook";
import { setAllContactsPage } from "@/store/userSlice";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import { ValueOf } from "next/dist/shared/lib/constants";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

interface contactsInfoProps {
  id: number;
  name: string;
  email: string;
  about: string;
  profilePicture: string;
}
[];

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[7.5rem] bg-[#008069] flex items-end px-3 py-4">
        <div className="flex items-center gap-12">
          <BiArrowBack
            className="cursor-pointer text-xl text-white"
            title="Back"
            onClick={() => {
              dispatch(setAllContactsPage({}));
            }}
          />
          <span className="text-white">New Chat</span>
        </div>
      </div>

      <div className="bg-[#ffffff] flex py-3 px-3 items-center gap-3 h-12 border border-gray-100 drop-shadow-md">
        <div className="bg-[#f0f2f5] flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
          <div className="flex text-[#54656f] gap-2 items-center justify-center">
            <BiSearchAlt2 className="cursor-pointer text-xl text-[#54656f]" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search Contacts"
              className="bg-transparent text-sm focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-white h-full overflow-auto w-full custom-scrollbar">
        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className="pl-10 py-10 text-[#008069]">{initialLetter}</div>
              {userList.map((contact: contactsInfoProps) => (
                <ChatLIstItem
                  key={contact.id}
                  contact={contact}
                  isContactPage={true}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
