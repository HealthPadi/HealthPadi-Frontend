//This is the about us page of the application that provides information about the application and its features.
"use client";
import Footer from "@/components/ui/footer";
import MainHeader from "@/components/ui/main-header";
import Image from "next/image";
import Link from "next/link";
import chatIcon from "../../../../assets/icons/chat Icon.svg";
import { useState } from "react";
import ChatModal from "../../../components/ChatModal";

export default function AboutUs() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatIconClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-grow flex flex-col justify-center items-center px-4">
        <h1 className="text-green-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-6">
          About Us
        </h1>
        <p className="mt-8 sm:mt-12 mx-auto max-w-full sm:max-w-3xl md:max-w-4xl text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          <span className="font-bold text-green-600">HealthPadi</span> is an
          application that seeks to bridge the gap between the mainstream health
          sector and the community. Your health and safety are our top
          priorities. With our new feature, you can receive real-time health
          updates tailored to your specific location.
        </p>
        <div className="mt-8 sm:mt-12 md:mt-auto self-center mb-6 sm:mb-8 lg:mb-10">
          <button onClick={handleChatIconClick}>
            <Image src={chatIcon} alt="chat icon" width={50} height={50} />
          </button>
        </div>
      </div>
      <Footer />
      {isChatOpen && (
        <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
      )}
    </div>
  );
}
