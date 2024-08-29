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
