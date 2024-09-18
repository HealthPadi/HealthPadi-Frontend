import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import useFeed from "../../hooks/useFeed";
import healthbadge from "../../../public/images/healthbadge.png";
import { useState, useEffect } from "react";
import { Feed } from "../../services/feedService";
import { Loader } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FeedsProps {
  limit?: number;
  showPagination?: boolean;
}

export default function Feeds({
  limit = 6,
  showPagination = false,
}: FeedsProps) {
  const { getFeedsQuery } = useFeed();
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCardClick = (feed: Feed) => {
    setSelectedFeed(feed);
  };

  const handleCloseModal = () => {
    setSelectedFeed(null);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (selectedFeed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedFeed]);

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

  const feeds = getFeedsQuery?.data?.data || [];
  const totalPages = Math.ceil(feeds.length / limit);
  const feedsToDisplay = feeds.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "bg-green-600 text-white" : ""}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 px-4 md:px-8 lg:px-12 mb-10">
        {getFeedsQuery.isLoading && (
          <div className="flex flex-col justify-center items-center w-full h-64">
            <Loader className="animate-spin text-green-500" size={40} />
            <p className="mt-4 text-gray-600">Please wait, feeds are loading</p>
          </div>
        )}
        {getFeedsQuery.isError && <div> Oops, something went wrong</div>}
        {!getFeedsQuery.isLoading && feedsToDisplay.length === 0 && (
          <div className="flex justify-center items-center w-full h-64">
            No posts available at the moment
          </div>
        )}
        {feedsToDisplay.map((feed: Feed, index: number) => {
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
              className="w-full"
            >
              <Card className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md h-full sm:h-80 md:h-96 lg:h-[32rem] shadow-sm shadow-gray-600 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col mx-auto">
                <CardHeader className="h-40 sm:h-48 md:h-56 lg:h-72">
                  <Image
                    src={healthbadge}
                    width={373}
                    height={228}
                    alt="an image of a mental health issue"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardContent
                  className="flex-grow p-4 overflow-hidden"
                  style={{ lineHeight: "1.75", margin: "10px 0" }}
                >
                  <CardTitle className="mb-4">{title}</CardTitle>
                  <CardDescription className="m-2 leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-2 ml-4 mt-auto text-right">
                  Generated By: {"AI ✨"}
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
      {selectedFeed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-full overflow-y-auto lg:max-w-2xl lg:p-8 relative transition-transform transform duration-300 ease-in-out"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 0px;
                background: transparent; /* make scrollbar transparent */
              }
            `}</style>
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-red-500 font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedFeed.title}</h2>
            <p className="mb-4">{selectedFeed.description}</p>
            <div className="mb-4">
              {formatContent(String(selectedFeed.remainingContent) || "")}
            </div>
          </div>
        </div>
      )}
      {showPagination && (
        <Pagination className="mb-4">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="bg-green-600 text-white"
                />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-green-600 text-white"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
