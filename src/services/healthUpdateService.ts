//This is the health update service that fetches health updates from the backend.
// healthUpdateService.ts
import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

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
  data: any;
  healthUpdate: HealthUpdateDetail;
};

class HealthUpdateService {
  async getHealthUpdate(): Promise<GetHealthUpdateResponse> {
    const response = await axiosConfig.get<GetHealthUpdateResponse>(
      "/api/report"
    );
    return response.data;
  }

  async getHealthUpdateById(id: string): Promise<HealthUpdateDetailResponse> {
    const response = await axiosConfig.get<HealthUpdateDetailResponse>(
      `/api/report/${id}`
    );
    return response.data;
  }
}

export default new HealthUpdateService();
