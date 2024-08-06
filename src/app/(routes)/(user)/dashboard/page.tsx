"use client";
import MainHeader from "../../../../components/ui/main-header";
import Image from "next/image";
import docImg from "../../../../../public/images/doctors.png";
import Footer from "../../../../components/ui/footer";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <>
      <MainHeader />
      <div className="px-6 md:px-24 pt-24 pb-1 flex flex-col md:flex-row justify-between border-b border-b-gray-600">
        <div className="flex flex-col items-start  ">
          <h1
            className="font-bold text-3xl md:text-5xl text-gray-600 leading-snug md:leading-tight"
            style={{ lineHeight: "1.2", whiteSpace: "normal" }}
          >
            Connecting Communities
            <br /> to Better Health
          </h1>
          <p className="pt-4 text-xl md:text-2xl text-gray-600">
            Bridging Health Gaps in Your Community
          </p>
          <div className="mt-8 md:mt-14 flex gap-4 md:gap-10">
            <Link href="/update" passHref>
              <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-full md:w-[200px] h-[45px] md:h-[55px] hover:bg-green-800">
                Get Health Updates
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
            className="w-[200px] md:w-[600px] h-[250px] md:h-[500px] object-cover"
            unoptimized
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
