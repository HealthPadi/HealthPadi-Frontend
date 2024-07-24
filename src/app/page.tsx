"use client";
import Link from "next/link";
import linkedinLogo from "../../assets/icons/logo-linkedin.svg";
import facebookLogo from "../../assets/icons/logo-facebook.svg";
import instagramLogo from "../../assets/icons/logo-instagram.svg";
import youTubeLogo from "../../assets/icons/logo-youtube.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainHeader from "../../components/main-header/main-header";
import Image from "next/image";
import maleImg from "../../public/images/male doctor.png";
import femaleImg from "../../public/images/female doctor.png";
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
              <button className="bg-green-600 rounded-lg text-white w-[160px] md:w-[200px] h-[45px] md:h-[55px]">
                Get Started
              </button>
              <button className="bg-green-600 rounded-lg text-white w-[160px] md:w-[200px] h-[45px] md:h-[55px]">
                Get Health Updates
              </button>
            </div>
          </div>
          <div className="flex items-end space-x-[-20px] md:space-x-[-40px] mt-8 md:mt-[-40px]">
            <Image
              src={maleImg}
              alt="an image of a male doctor"
              width={200}
              height={250}
              className="w-[200px] md:w-[400px] h-[250px] md:h-[500px]"
            />
            <Image
              src={femaleImg}
              alt="an image of a female doctor"
              width={200}
              height={250}
              className="w-[200px] md:w-[400px] h-[250px] md:h-[500px]"
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
          <button className="w-[130px] h-[55px] font-medium m-10 p-4 rounded-lg gap-6 bg-green-500 text-white">
            See More
          </button>
        </div>
      </main>
      <footer className="p-10 m-30 bg-green-600">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-4">
            <Image
              className="t-[8px] l-[8px]"
              src={facebookLogo}
              alt="facebook logo"
              width={24}
              height={24}
            />
            <Image
              className="t-[8px] l-[8px]"
              src={linkedinLogo}
              alt="linkedin logo"
              width={24}
              height={24}
              color="white"
            />
            <Image
              className="t-[8px] l-[8px]"
              src={youTubeLogo}
              alt="youtube logo"
              width={24}
              height={24}
            />
            <Image
              className="t-[8px] l-[8px]"
              src={instagramLogo}
              alt="instagram logo"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-white text-xl"> (c) HealthPadi 2024</h1>
        </div>
      </footer>
    </>
  );
}
