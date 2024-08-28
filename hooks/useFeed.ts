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
