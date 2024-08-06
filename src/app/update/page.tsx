"use client";
import MainHeader from "../../../components/main-header/main-header";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import healthbadge from "../../../public/images/healthbadge.png";
import enableLocation from "../../../assets/icons/enable location.svg";
import chatIcon from "../../../assets/icons/chat Icon.svg";
import { Londrina_Sketch } from "next/font/google";

export default function HealthUpdate() {
  return (
    <>
      <MainHeader />
      <div className="mt-10 px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
        <div className="ml-0 md:ml-10">
          <h1 className="text-lg text-gray-600 font-bold mb-2">
            Get Health Update
          </h1>
          <div className="flex items-center mb-3">
            <Input
              type="text"
              placeholder="Search keywords"
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mb-3">
            <Input
              type="text"
              placeholder="Location"
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <Image
              src={enableLocation}
              alt="enable location"
              width={30}
              height={30}
              className="ml-3"
            />
          </div>
          <Link href="/">
            <button className="bg-green-600 text-white w-full h-12 md:h-14 mb-3 rounded-sm hover:bg-green-800">
              Submit
            </button>
          </Link>
          <div>
            <Image
              src={healthbadge}
              alt="health badge"
              width={500}
              height={500}
              unoptimized
              className="mx-auto md:w-auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center ml-0 md:ml-20">
          <div>
            <h1 className="text-4xl md:text-6xl leading-relaxed md:leading-snug text-green-600">
              Health <br />
              Updates
            </h1>
            <p className="mb-9 mt-8 text-base md:text-lg text-gray-500">
              You can get a detailed health report tailored to
              <br /> a location, helping you stay informed and
              <br /> proactive about your health.
            </p>
            <h3 className="text-gray-800 text-lg md:text-xl font-bold mt-10 md:mt-56">
              Stay informed about the latest health news, alerts, and advice
              relevant to your area by staying connected.
            </h3>
          </div>
          <Link href="/" className="mt-10 md:mt-auto self-end">
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </Link>
        </div>
      </div>
    </>
  );
}
