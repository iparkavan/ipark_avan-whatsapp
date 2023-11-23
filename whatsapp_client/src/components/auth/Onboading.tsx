"use client";

import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import Input from "../common/Input";
import Avatar from "../common/Avatar";
import axios from "axios";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { setNewUser, setUserInfo } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const Onboading = () => {
  const router = useRouter();

  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isNewuser = useAppSelector((state) => state.user.newUser);

  const dispatch = useAppDispatch();

  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(
    userInfo?.profileImage || "/default_avatar.png"
  );

  useEffect(() => {
    if (!isNewuser && !userInfo?.email) {
      router.push("/login");
    } else if (!isNewuser && userInfo?.email) {
      router.push("/");
    }
  }, [isNewuser, router, userInfo?.email]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          name,
          email,
          image,
          about,
        });

        if (data.status) {
          dispatch(
            setNewUser({
              newUser: false,
            })
          );
          dispatch(
            setUserInfo({
              id: data.user.id,
              name,
              email,
              profileImage: image,
              status: about,
            })
          );
        }
        router.push("/");
      } catch (error: any) {
        console.log(`Error validating User: ${error.message}`);
      }
    }
  };

  const validateDetails = () => {
    if (userInfo) {
      if (userInfo?.name.trim().length < 3) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div className="h-screen w-screen text-white flex flex-col items-center justify-center bg-panel-header-background">
      <div className="flex items-center justify-center gap-2">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>

      <h2 className="text-2xl">Create your profile</h2>

      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" value={name} onChange={setName} label />
          <Input name="About" value={about} onChange={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};

export default Onboading;
