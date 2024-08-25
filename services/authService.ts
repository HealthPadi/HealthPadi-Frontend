import { AxiosResponse } from "axios";
import { z } from "zod";
import axiosConfig from "../config/axios";

// Define the request and response schemas using Zod
const RegisterRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  roles: z.array(z.string()),
});

const RegisterResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

// Define TypeScript interfaces based on Zod schemas
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

class AuthService {
  static register = async (
    requestBody: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> => {
    try {
      RegisterRequestSchema.parse(requestBody);
      const response = await axiosConfig.post(
        "api/account/register",
        requestBody
      );
      return response;
    } catch (error) {
      console.error("Error in register request:", error);
      throw error;
    }
  };

  static login = async (
    requestBody: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    try {
      LoginRequestSchema.parse(requestBody);
      const response = await axiosConfig.post("api/account/login", requestBody);
      return response;
    } catch (error) {
      console.error("Error in login request:", error);
      throw error;
    }
  };

  // //google sigin
  // static googleSignIn = async (
  //   requestBody: any
  // ): Promise<AxiosResponse<LoginResponse>> => {
  //   try {
  //     const response = await axiosConfig.post(
  //       "api/account/google-login",
  //       requestBody
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error("Error in google signin request:", error);
  //     throw error;
  //   }
  // };
}

export default AuthService;
