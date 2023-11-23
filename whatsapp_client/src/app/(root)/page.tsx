"use client";

import MainPage from "@/components/MainPage";
import Main from "@/components/MainPage";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { setUserInfo } from "@/store/userSlice";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isNewUser = useAppSelector((state) => state.user.newUser);
  const dispatch = useAppDispatch();

  const [redirectLogin, setRedirectLogin] = useState(false);


  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin, router]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser?.email,
      });
      if (!data?.status) {
        router.push("/login");
      }
      if (data?.data) {
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
      }
    }
  });

  return (
    <main className="bg-[#e0e0dd] w-full h-screen">
      <div className="bg-[#00a884] w-screen h-32">
        <MainPage />
      </div>
    </main>
  );
}
