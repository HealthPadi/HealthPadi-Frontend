import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import healthImg from "../../../public/images/healthImg.jpeg";
import Link from "next/link";

export default function Feeds() {
  const healthUpdateCards = [
    {
      img: healthImg,
      title: "How to Identify Covid 19 Symptoms",
      description:
        "Covid-19 is an infectious disease caused by the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). It was first identified in December 2019 in Wuhan, China, and has since spread globally, resulting in the ongoing 2019–20 coronavirus pandemic.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/1",
    },
    {
      img: healthImg,
      title: "How to Identify Covid 19 Symptoms",
      description:
        "Covid-19 is an infectious disease caused by the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). It was first identified in December 2019 in Wuhan, China, and has since spread globally, resulting in the ongoing 2019–20 coronavirus pandemic.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/1",
    },
    {
      img: healthImg,
      title: "How to Identify Covid 19 Symptoms",
      description:
        "Covid-19 is an infectious disease caused by the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). It was first identified in December 2019 in Wuhan, China, and has since spread globally, resulting in the ongoing 2019–20 coronavirus pandemic.",
      postedBy: "Dr Steven Alli",
      link: "/healthUpdates/1",
    },
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-20 gap-8 lg:gap-20">
        {healthUpdateCards.map((card, index) => (
          <Link key={index} href={card.link} passHref>
            <Card className="w-full md:w-[480px] lg:w-[500px] shadow-sm shadow-gray-600 cursor-pointer hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <Image
                  src={card.img}
                  width={500}
                  height={200}
                  alt="an image of a mental health issue"
                  className=""
                />
                <CardTitle className="p-2 text-lg md:text-xl lg:text-2xl">
                  {card.title}
                </CardTitle>
                <CardDescription className="p-2 text-sm md:text-base lg:text-lg">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between text-sm md:text-base lg:text-lg">
                Posted By: {card.postedBy}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      ;
    </>
  );
}
