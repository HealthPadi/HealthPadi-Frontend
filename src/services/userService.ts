import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

export interface User {
  report: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  point: number;
}
export interface UserReport {
  status: string;
  data: Reports[];
}
export interface Reports {
  reprtId: string;
  userId: string;
  location: string;
  content: string;
}
export interface GetUsersResponse {
  status: string;
  data: User[];
}
export interface NoUserReport {
  status: string;
  message: string;
}
class UserService {
  static getUsers = async (): Promise<AxiosResponse<GetUsersResponse>> => {
    try {
      return await axiosConfig.get("api/user");
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  // Get user by userId to get user details
  static getUserById = async (userId: string): Promise<AxiosResponse<User>> => {
    try {
      return await axiosConfig.get(`api/user/${userId}`);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  };

  // Method to get the number of reports for a user
  static getUserReport = async (
    userId: string
  ): Promise<AxiosResponse<UserReport | NoUserReport>> => {
    try {
      return await axiosConfig.get(`api/user/${userId}/reports`);
    } catch (error) {
      console.error(
        `Error fetching reports for user with ID ${userId}:`,
        error
      );
      throw error;
    }
  };
}

export default UserService;
