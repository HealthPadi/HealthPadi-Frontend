//This page contains the hero text and image for the home page

import Link from "next/link";
import Image from "next/image";
import docImg from "../../../public/images/doctors.png";

export default function HeroText() {
  return (
    <div className="px-6 md:px-24 pt-6 md:pt-24 pb-1 flex flex-col md:flex-row justify-between border-b border-b-gray-600">
      <div className="flex flex-col items-start">
        <h1
          className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-600 leading-snug md:leading-tight"
          style={{ lineHeight: "1.2", whiteSpace: "normal" }}
        >
          Connecting Communities
          <br /> to Better Health
        </h1>
        <p className="pt-4 text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
          Bridging Health Gaps in Your Community
        </p>
        <div className="mt-8 md:mt-10 lg:mt-14 flex gap-4 md:gap-6 lg:gap-10">
          <Link href="/update" passHref>
            <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-[180px] md:w-[200px] h-[45px] md:h-[55px] hover:bg-gradient-to-r from-green-600 to-green-950">
              Get Health Updates
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 flex justify-center">
        <Image
          src={docImg}
          alt="an image of two doctors"
          width={400}
          height={250}
          className="w-[300px] md:w-[400px] lg:w-[600px] h-[200px] md:h-[250px] lg:h-[500px] object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
