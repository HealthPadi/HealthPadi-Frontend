//This is the feed hook that is used to fetch feeds. It uses the useQuery hook from react-query to fetch feeds. It also uses the feedService to fetch feeds. It returns the getFeedsQuery function that can be used to fetch feeds.
import { useState } from "react";

import feedService from "../services/feedService";
import { useQuery } from "@tanstack/react-query";

const useFeed = () => {
  const getFeedsQuery = useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      const response = await feedService.getAllFeeds();
      return response.data;
    },
  });

  return {
    getFeedsQuery,
  };
};

export default useFeed;
