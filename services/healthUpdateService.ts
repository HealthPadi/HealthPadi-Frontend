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

export interface GetHealthUpdateResponse {
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
  async getHealthUpdate(): Promise<
    AxiosResponse<GetHealthUpdateResponse, any>
  > {
    return (await axiosConfig.get)<GetHealthUpdateResponse>("/api/report");
  }

  async getHealthUpdateById(
    id: string
  ): Promise<AxiosResponse<HealthUpdateDetailResponse>> {
    return axiosConfig.get(`/api/report/${id}`);
  }
}

export default new HealthUpdateService();
