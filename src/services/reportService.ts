//This is the report service that handles the creation of reports in the application. It makes an API call to the server to create a report and returns the response from the server.
import { z } from "zod";
import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

// Define the request and response schemas using Zod
const ReportRequestSchema = z.object({
  userId: z.string(),
  content: z.string(),
  location: z.string(),
});

const ReportResponseSchema = z.object({
  reportId: z.string(),
  userId: z.string(),
  content: z.string(),
  location: z.string(),
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
