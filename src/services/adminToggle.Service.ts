import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

export interface AdminToggleRequest {
  userId: string;
}

export interface AdminToggleResponse {
  userId: any;
  status: string;
  message: string;
  canReport: boolean; // Add this field to the response
}

class AdminToggleService {
  static async adminToggle(
    requestBody: AdminToggleRequest
  ): Promise<{ data: { data: AdminToggleResponse } }> {
    return await axiosConfig.post(
      `api/admin/toggle-user-status/${requestBody.userId}`,
      requestBody
    );
  }
}

export default AdminToggleService;
