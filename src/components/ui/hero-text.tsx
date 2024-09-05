//This page contains the hero text and image for the home page

import Link from "next/link";
import Image from "next/image";
import docImg from "../../../public/images/doctors.png";

export default function HeroText() {
  return (
    <div className="container mx-auto px-6 md:px-24 pt-6 md:pt-16 pb-1 flex flex-col md:flex-row justify-between border-b border-b-gray-600">
      <div className="flex flex-col items-start ml-0 md:ml-0 lg:ml-0 xl:ml-0">
        <h1 className="font-bold text-4xl md:text-5xl text-gray-600 leading-snug md:leading-tight md:pt-4">
          Connecting&nbsp;Communities
          <br />
          to Better Health
        </h1>
        <p className="pt-8 md:pt-6 text-lg md:text-xl text-gray-600">
          Bridging Health Gaps in Your Community
        </p>
        <div className="mt-20 md:mt-24 flex gap-4 md:gap-6">
          <Link href="/update" passHref>
            <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-36 md:w-44 h-10 md:h-12 hover:bg-gradient-to-r from-green-600 to-green-950">
              Get Health Update
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-8 md:mt-[-40px] flex justify-center">
        <Image
          src={docImg}
          alt="an image of two doctors"
          width={500}
          height={300}
          // className="w-[200px] md:w-[600px] h-[250px] md:h-[500px] object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
