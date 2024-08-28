import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";
import { create } from "zustand";

interface create {
  id: string;
  location: string;
  content: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  location: string;
  content: string;
}

export interface GetAllReportsResponse {
  reports: Report[];
}

type Option = {
  value: string;
  label: string;
};

type ReportDetail = {
  id: string;
  location: string;
  content: string;
};

type ReportDetailResponse = {
  report: ReportDetail;
};

class ReportService {
  async createReport(data: create): Promise<AxiosResponse> {
    return axiosConfig.post("/reports", data);
  }

  async getAllReports(): Promise<AxiosResponse<GetAllReportsResponse>> {
    return axiosConfig.get("/reports");
  }

  async getReportById(
    id: string
  ): Promise<AxiosResponse<ReportDetailResponse>> {
    return axiosConfig.get(`/reports/${id}`);
  }

  async updateReport(id: string, data: create): Promise<AxiosResponse> {
    return axiosConfig.put(`/reports/${id}`, data);
  }

  async deleteReport(id: string): Promise<AxiosResponse> {
    return axiosConfig.delete(`/reports/${id}`);
  }
}

export default new ReportService();
