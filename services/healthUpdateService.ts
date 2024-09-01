import { ReactNode } from "react";
import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";
// import HealthUpdate from "../src/app/update/page";

export interface HealthUpdate {
  reportId: string;
  userId: string;
  location: string;
  content: string;
}

export interface GetAllHealthUpdatesResponse {
  status: string;
  data: HealthUpdate[];
}

type HealthUpdateDetail = {
  status: string;
  data: HealthUpdate;
};

type HealthUpdateDetailResponse = {
  healthUpdate: HealthUpdateDetail;
};

class HealthUpdateService {
  async getAllHealthUpdates(): Promise<
    AxiosResponse<GetAllHealthUpdatesResponse, any>
  > {
    return (await axiosConfig.get)<GetAllHealthUpdatesResponse>("/api/report");
  }

  async getHealthUpdateById(
    id: string
  ): Promise<AxiosResponse<HealthUpdateDetailResponse>> {
    return axiosConfig.get(`/api/report/${id}`);
  }
}

export default new HealthUpdateService();
