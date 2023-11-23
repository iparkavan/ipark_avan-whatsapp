"use client";

import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setNewUser, setUserInfo } from "@/store/userSlice";

const Login = () => {
  const router = useRouter();

  // const [{}, dispatch]: any = useStateProvider();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isNewUser = useAppSelector((state) => state.user.newUser);

  useEffect(() => {
    if (userInfo?.id && !isNewUser) {
      router.push("/");
    }
  }, [isNewUser, router, userInfo?.id]);

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email });
      console.log(data);

      if (!data.status) {
        dispatch(
          setNewUser({
            newUser: true,
          })
        );
        dispatch(
          setUserInfo({
            id: data.id,
            name,
            email,
            profileImage,
            status: "",
          })
        );

        router.push("/onboarding");
      } else {
        const {
          id,
          name,
          email,
          profilePicture: profileImage,
          about: status,
        } = data.data;
        dispatch(
          setUserInfo({
            id,
            name,
            email,
            profileImage,
            status,
          })
        );
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6 bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src={"/whatsapp.gif"} alt="Whatsapp" width={300} height={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={loginHandler}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
};

export default Login;
