import { ReactNode } from "react";
import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

export interface Feed {
  remainingContent: ReactNode;
  title: ReactNode;
  description: ReactNode;
  feedId: string;
  feedContent: string;
}

export interface GetAllFeedsResponse {
  status: string;
  data: Feed[];
}

type FeedDetail = {
  status: string;
  data: Feed;
};

type FeedDetailResponse = {
  feed: FeedDetail;
};

class FeedService {
  async getAllFeeds(): Promise<AxiosResponse<GetAllFeedsResponse, any>> {
    return (await axiosConfig.get)<GetAllFeedsResponse>("/api/feed");
  }

  //   async getFeedById(id: string): Promise<AxiosResponse<FeedDetailResponse>> {
  //     return axiosConfig.get(`/feed/${id}`);
  //   }
}

export default new FeedService();
