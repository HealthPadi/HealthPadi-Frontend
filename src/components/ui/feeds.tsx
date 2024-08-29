import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import useFeed from "../../../hooks/useFeed";
import healthbadge from "../../../public/images/healthbadge.png";
import { useState } from "react";
import { Feed } from "../../../services/feedService"; // Adjust the path as necessary

interface FeedsProps {
  limit?: number;
}

export default function Feeds({ limit }: FeedsProps) {
  const { getFeedsQuery } = useFeed();
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);

  const handleCardClick = (feed: Feed) => {
    setSelectedFeed(feed);
  };

  const handleCloseModal = () => {
    setSelectedFeed(null);
  };

  const splitContent = (content: string) => {
    const lines = content.split("\n");
    const title = lines[0];
    const descriptionLines = lines.slice(1, 6).join(" ");
    const truncatedDescription = truncateAtFullStop(descriptionLines, 300);
    const remainingContent = lines.slice(6).join("\n");
    return { title, description: truncatedDescription, remainingContent };
  };

  const truncateAtFullStop = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastFullStop = truncated.lastIndexOf(".");
    return lastFullStop !== -1
      ? truncated.substring(0, lastFullStop + 1)
      : truncated;
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("- ")) {
        return <li key={index}>{line.substring(2)}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  const feedsToDisplay = limit
    ? getFeedsQuery?.data?.data?.slice(0, limit)
    : getFeedsQuery?.data?.data;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 pl-8 pr-8 mb-10">
        {getFeedsQuery.isLoading && <div>Loading...</div>}
        {getFeedsQuery.isError && <div>Something went wrong</div>}
        {(getFeedsQuery?.data?.data?.length ?? 0) < 1 && (
          <div>No posts available at the moment</div>
        )}
        {feedsToDisplay?.map((feed: Feed, index: number) => {
          const { title, description, remainingContent } = splitContent(
            feed.feedContent
          );
          return (
            <div
              key={index}
              onClick={() =>
                handleCardClick({
                  ...feed,
                  title,
                  description,
                  remainingContent,
                })
              }
            >
              <Card className="w-104 h-128 shadow-sm shadow-gray-600 cursor-pointer hover:shadow-md transition-shadow duration-200">
                <CardHeader className="h-1/3">
                  <Image
                    src={healthbadge}
                    width={240}
                    height={160}
                    alt="an image of a mental health issue"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardContent
                  className="h-2/3 p-4 overflow-hidden"
                  style={{ lineHeight: "1.6", margin: "10px 0" }}
                >
                  <CardTitle className="mb-2">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-end p-2">
                  Generated By: {"AI ✨"}
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
      {selectedFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedFeed.title}</h2>
            <p className="mb-4">{selectedFeed.description}</p>
            <div>
              {formatContent(String(selectedFeed.remainingContent) || "")}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
