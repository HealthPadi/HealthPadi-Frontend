import { z } from "zod";
import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";
import { Content } from "next/font/google";

// Define the request and response schemas using Zod
const ReportRequestSchema = z.object({
  location: z.string().optional(),
  Content: z.string(),
});

const ReportResponseSchema = z.object({
  message: z.string(),
  reportId: z.string(),
});

// Define TypeScript types based on Zod schemas
export type ReportRequest = z.infer<typeof ReportRequestSchema>;
export type ReportResponse = z.infer<typeof ReportResponseSchema>;

class ReportService {
  async createReport(
    requestBody: ReportRequest,
    token: string
  ): Promise<AxiosResponse<ReportResponse>> {
    try {
      // Validate request body against the schema
      ReportRequestSchema.parse(requestBody);

      // Make API call with token in headers
      const response = await axiosConfig.post<ReportResponse>(
        "/api/report",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error("Error in create report request:", error);
      throw error;
    }
  }
}

export default new ReportService();
