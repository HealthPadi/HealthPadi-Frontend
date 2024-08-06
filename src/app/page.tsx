"use client";
import Link from "next/link";
import Footer from "@/components/ui/footer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainHeader from "../components/ui/main-header";
import Image from "next/image";
import docImg from "../../public/images/doctors.png";
import mentalImg from "../../public/images/mental health.jpeg";

export default function Home() {
  const healthUpdateCards = [
    {
      img: mentalImg,
      title: "How to Identify Early stage Mental Health Issues",
      description:
        "Mental health is a state of well-being in which an individual realizes his or her abilities, can cope with the normal stresses of life, can work productively.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/1",
    },
    {
      img: mentalImg,
      title: "How to Identify Early stage Mental Health Issues",
      description:
        "Mental health is a state of well-being in which an individual realizes his or her abilities, can cope with the normal stresses of life, can work productively.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/2",
    },
    {
      img: mentalImg,
      title: "How to Identify Early stage Mental Health Issues",
      description:
        "Mental health is a state of well-being in which an individual realizes his or her abilities, can cope with the normal stresses of life, can work productively.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/3",
    },
  ];

  return (
    <>
      <MainHeader />
      <main className="mb-10">
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
              <Link href="/register" passHref>
                <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-[160px] md:w-[200px] h-[45px] md:h-[55px] hover:bg-green-800">
                  Get Started
                </div>
              </Link>
              <Link href="/login" passHref>
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
        <div className="flex flex-col md:flex-row justify-center items-center mt-20 gap-8 md:gap-20">
          {healthUpdateCards.map((card, index) => (
            <Link key={index} href={card.link} passHref>
              <Card className="w-full md:w-[480px] shadow-sm shadow-gray-600 cursor-pointer hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <Image
                    src={card.img}
                    width={500}
                    height={200}
                    alt="an image of a mental health issue"
                    className=""
                  />
                  <CardTitle className="p-2">{card.title}</CardTitle>
                  <CardDescription className="p-2">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex justify-between">
                  Posted By: {card.postedBy}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="p-10 flex items-center justify-center">
          <button className="w-[130px] h-[55px] font-medium m-10 p-4 rounded-lg gap-6 bg-green-500 hover:bg-green-800 text-white">
            See More
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
