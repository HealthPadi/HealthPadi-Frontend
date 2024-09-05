//This is the user dashboard page that displays the feeds and allows the user to see more feeds and also navagate to other pages in the application.
"use client";

import { useState } from "react";
import Feeds from "@/components/ui/feeds";
import MainHeader from "@/components/ui/main-header";
import Image from "next/image";
import HeroText from "@/components/ui/hero-text";
import { useAuthState } from "../../../../../store/authStore";
import Link from "next/link";
import chatIcon from "../../../../../assets/icons/chat Icon.svg";
import ChatModal from "../../../../components/ChatModal";

export default function Home() {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const { user } = useAuthState();

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
        <Feeds limit={3} />
        <div className="p-10 flex items-center justify-center">
          <Link
            href="/seeMore"
            className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 font-medium rounded-lg bg-gradient-to-r from-green-600 to-green-950 text-white text-center"
          >
            See More
          </Link>
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
            onClick={openChatModal} // Add the onClick event to open the chat modal
          >
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </div>
        </div>
      </main>

      {/* Include the ChatModal component and pass the necessary props */}
      <ChatModal isOpen={isChatModalVisible} onClose={closeChatModal} />
    </>
  );
}
