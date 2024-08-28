"use client";
import { useState } from "react";
import Footer from "@/components/ui/footer";
import Feeds from "@/components/ui/feeds";
import MainHeader from "../../../../components/ui/main-header";
import Image from "next/image";
import chatIcon from "../../../../../assets/icons/chat Icon.svg";
import HeroText from "@/components/ui/hero-text";
import { useAuthState } from "../../../../../store/authStore";
import { get } from "http";
export default function Home() {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const { user } = useAuthState();

  console.log({ user });
  const openChatModal = () => {
    setIsChatModalVisible(true);
  };

  const closeChatModal = () => {
    setIsChatModalVisible(false);
  };

  return (
    <>
      <MainHeader />
      <main className="mb-10">
        <HeroText />
        <Feeds />
        <div className="mt-12 flex flex-col items-center gap-6">
          <button className="w-[120px] md:w-[130px] lg:w-[150px] h-[50px] md:h-[55px] lg:h-[60px] font-medium p-4 rounded-lg bg-gradient-to-r from-green-600 to-green-950 text-white">
            See More
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-between w-full px-6 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16">
          <div className="text-green-900 flex flex-col w-full max-w-3xl leading-relaxed text-sm md:text-base lg:text-lg">
            <p>
              Click the button to start receiving your personalized health
              updates
            </p>
            <p className="font-bold">
              Stay informed about the latest health news, alerts, and advice
              relevant to your area by staying connected.
            </p>
            <p>Stay informed, stay healthy!</p>
          </div>
          <div
            className="flex-none ml-2 md:ml-4 mt-4 lg:mt-0 cursor-pointer"
            onClick={openChatModal}
          >
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
