//This is the auth hook that is used to handle authentication. It uses the useMutation and useQuery hooks from react-query to handle sign up, login, and reset password. It also uses the AuthService to handle authentication. It returns the signUpMutation, loginMutation, resetPasswordMutation, googleLogin, user, token, setUser, setToken, clearAuth, and logout functions that can be used to handle authentication.
import AuthService, {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
} from "../services/authService";
import { useAuthState } from "../store/authStore";
import axiosResponseMessage from "@/lib/axiosResponseMessage";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import axiosConfig from "../config/axios";
import { Code } from "lucide-react";
import toast from "react-hot-toast";
import { on } from "events";

const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, user, token, clearAuth } = useAuthState();

  const signUpMutation = useMutation({
    mutationFn: async (requestBody: RegisterRequest) => {
      const response = await AuthService.register(requestBody);
      return response.data; // Return only the response data
    },
    onError: (error: AxiosError) => {
      // Handle error (optional)
      console.error(axiosResponseMessage(error));
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (requestBody: LoginRequest) => {
      const response = await AuthService.login(requestBody);
      return response.data; // Return only the response data
    },
    onSuccess: (data: LoginResponse) => {
      setToken(data.data.jwtToken);
      setUser(data.data.user);
      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      // Handle error (optional)
      console.error(axiosResponseMessage(error));
    },
  });

  // const googleSignInMutation = useMutation({
  //   mutationFn: async (requestBody: { token: string }) => {
  //     const response = await AuthService.googleSignIn(code);
  //     return response.data; // Return only the response data
  //   },
  //   onError: (error: AxiosError) => {
  //     // Handle error (optional)
  //     console.error(axiosResponseMessage(error));
  //   },
  // });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Mark the function as async
      try {
        const { code } = tokenResponse;

        // Await the axios post request to ensure the call completes before proceeding
        const response = await axiosConfig.post(
          `/api/account/google-login?authCode=${code}`
        );
        // You can now handle the response, e.g., setting the JWT token in local storage
        toast.success("Login successful", {
          duration: 1000,
          icon: "🎉",
        });

        console.log("Login successful:", response.data);

        setToken(response.data.jwtToken);
        setUser(response.data.user);
        router.push("/dashboard");
      } catch (error) {
        toast.error("Login  with google failed", {
          duration: 1000,
          icon: "❌",
        });

        console.error("Error during Google login:", error);
      }
    },
    flow: "auth-code",
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (requestBody: ResetPasswordRequest) => {
      const response = await AuthService.resetPassword(requestBody);
      return response.data; // Return only the response data
    },
    onError: (error: AxiosError) => {
      // Handle error (optional)
      console.error(axiosResponseMessage(error));
    },
  });

  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  return {
    signUpMutation,
    loginMutation,
    resetPasswordMutation,
    googleLogin,
    user,
    token,
    setUser,
    setToken,
    clearAuth,
    logout,
  };
};

export default useAuth;
