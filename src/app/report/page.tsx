"use client";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import enableLocation from "../../../assets/icons/enable location.svg";
import chatIcon from "../../../assets/icons/chat Icon.svg";
import Link from "next/link";
import healthPadi from "../../../public/images/healthPadi.png";
import MainHeader from "../../components/ui/main-header";

export default function CreateReport() {
  return (
    <>
      <MainHeader />
      <div className="px-6 md:px-24 pt-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
        <div>
          <h1 className="text-green-600 text-6xl  mb-4">Reports</h1>
          <p className="mb-6 mt-6 text-gray-600">
            You can create a detailed health report tailored to your location,
            helping you stay informed and proactive about your health.
          </p>
          <Image
            src={healthPadi}
            alt="an image of a hospital"
            width={200}
            height={200}
            unoptimized
            className="mx-auto md:w-auto "
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-gray-600">
            Create Report
          </h1>
          <div className="flex flex-col mb-6">
            <Input
              type="text"
              placeholder="Search keywords"
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mb-6">
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
          <h1 className="text-xl font-bold mb-4 text-gray-600">
            Report Description
          </h1>
          <textarea className="w-full h-40 md:h-56 mb-6 outline-none border-2 rounded-md border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 p-3" />
          <Link href="/">
            <button className=" bg-green-600 text-white w-full h-12 md:h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950">
              Submit
            </button>
          </Link>
          <Link href="/chat" className="mt-10 self-end">
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </Link>
        </div>
      </div>
    </>
  );
}
