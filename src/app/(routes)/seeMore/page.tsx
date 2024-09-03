//This is the feeds page that displays the feeds from the AI.It displays the feeds in a card format and allows the user to click on a card to view the full content of the feed. It also displays a modal with the full content of the feed when a card is clicked.

"use client";

import MainHeader from "@/components/ui/main-header";
import Feeds from "@/components/ui/feeds";
import Footer from "@/components/ui/footer";
export default function FeedPage() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-600 mt-10">
          Health Feeds
        </h1>

        <div className="mb-28">
          <Feeds />
        </div>
      </div>
      <Footer />
    </>
  );
}
