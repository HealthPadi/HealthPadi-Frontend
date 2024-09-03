// This is the home page of the HealthPadi application. It displays a brief description of the application and its purpose. It also contains a call to action for users to get started or get health updates. The page also displays the latest feeds from the AI in a card format.
"use client";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import docImg from "../../public/images/doctors.png";
import HeaderText from "@/components/ui/header-text";
import Feeds from "@/components/ui/feeds";

export default function Home() {
  return (
    <>
      <HeaderText />
      <main className="mb-10">
        <div className="container mx-auto px-6 md:px-24 pt-6 md:pt-16 pb-1 flex flex-col md:flex-row justify-between border-b border-b-gray-600">
          <div className="flex flex-col items-start md:ml-4">
            <h1
              className="font-bold text-4xl md:text-3xl text-gray-600 leading-snug md:leading-tight md:pt-4"
              style={{ lineHeight: "1.2", whiteSpace: "normal" }}
            >
              Connecting Communities
              <br /> to Better Health
            </h1>
            <p className="pt-4 md:pt-2 text-xl md:text-2xl text-gray-600">
              Bridging Health Gaps in Your Community
            </p>
            <div className="mt-8 md:mt-14 flex gap-4 md:gap-10">
              <Link href="/register" passHref>
                <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-[100px] md:w-[180px] h-[40px] md:h-[55px] hover:bg-gradient-to-r from-green-600 to-green-950">
                  Get Started
                </div>
              </Link>
              <Link href="/login" passHref>
                <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-[100px] md:w-[180px] h-[40px] md:h-[55px] hover:bg-gradient-to-r from-green-600 to-green-950">
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
        <Feeds limit={3} />
        <div className="p-10 flex items-center justify-center">
          <Link
            href="/seeMore"
            className="w-[100px] md:w-[130px] lg:w-[150px] h-[45px] md:h-[55px] lg:h-[60px] font-medium p-4 rounded-lg bg-gradient-to-r from-green-600 to-green-950 text-white text-center"
          >
            See More
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
