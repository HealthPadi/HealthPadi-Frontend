//This is the auth service that handles user authentication.
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
  status: z.string(),
  data: z.object({
    user: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      point: z.number(),
      report: z.number(),
    }),
    jwtToken: z.string(),
  }),
});

const ResetPasswordRequestSchema = z.object({
  email: z.string().email(),
});

const ResetPasswordResponseSchema = z.object({
  message: z.string(),
});

const googleSignInRequestSchema = z.object({
  token: z.string(),
});

// Define TypeScript types based on Zod schemas
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

class AuthService {
  static register = async (
    requestBody: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> => {
    try {
      // Validate request body against the schema
      RegisterRequestSchema.parse(requestBody);

      // Make API call
      const response = await axiosConfig.post<RegisterResponse>(
        "api/account/register",
        requestBody
      );

      return response;
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error("Error in register request:", error);

      // Rethrow the error
      throw error;
    }
  };

  static login = async (
    requestBody: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    try {
      // Validate request body against the schema
      LoginRequestSchema.parse(requestBody);

      // Make API call
      const response = await axiosConfig.post<LoginResponse>(
        "api/account/login",
        requestBody
      );

      return response;
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error("Error in login request:", error);
      throw error;
    }
  };

  static resetPassword = async (
    requestBody: ResetPasswordRequest
  ): Promise<AxiosResponse<ResetPasswordResponse>> => {
    try {
      // Validate request body against the schema
      ResetPasswordRequestSchema.parse(requestBody);

      // Make API call
      const response = await axiosConfig.post<ResetPasswordResponse>(
        "api/account/reset-password",
        requestBody
      );

      return response;
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error("Error in reset password request:", error);
      throw error;
    }
  };

  static googleSignIn = async (
    authCode: string
  ): Promise<AxiosResponse<LoginResponse>> => {
    try {
      // Directly use the authCode without encoding in the path
      const response = await axiosConfig.post<LoginResponse>(
        `/api/account/google-login`,
        null, // No request body needed
        { params: { authCode } } // Pass the authCode as a query parameter
      );
      return response;
    } catch (error) {
      console.error("Error in google signin request:", error);
      throw error;
    }
  };
}

export default AuthService;
