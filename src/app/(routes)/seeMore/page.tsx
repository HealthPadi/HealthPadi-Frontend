"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderText from "@/components/ui/header-text";
import MainHeader from "@/components/ui/main-header";
import Feeds from "@/components/ui/feeds";
import { useAuthState } from "../../../../store/authStore";

export default function FeedPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useAuthState();
  useEffect(() => {
    // Replace this with your actual authentication check logic
    const userLoggedIn = checkUserAuthentication();
    setIsLoggedIn(userLoggedIn);
  }, []);

  const checkUserAuthentication = () => {
    // Implement your authentication check logic here
    // For example, check if a token exists in localStorage
    return !!localStorage.getItem("authToken");
  };

  return (
    <>
      <HeaderText />
      {isLoggedIn && <MainHeader />}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-600 mt-4">Health Feeds</h1>
        <div className="mt-[-48px]">
          <Feeds />
        </div>
      </div>
    </>
  );
}
