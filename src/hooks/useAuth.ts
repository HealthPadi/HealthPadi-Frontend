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
import toast from "react-hot-toast";

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

      // Retrieve points from localStorage
      const storedPoints = localStorage.getItem("userPoints");
      const points = storedPoints
        ? parseInt(storedPoints, 10)
        : data.data.user.point || 0;

      setUser({
        ...data.data.user,
        point: points,
        canReport: data.data.user.canReport, // Ensure canReport is included
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      // Handle error (optional)
      console.error(axiosResponseMessage(error));
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { code } = tokenResponse;
        const response = await axiosConfig.post(
          `/api/account/google-login?authCode=${code}`
        );

        toast.success("Login successful", {
          duration: 1000,
          icon: "🎉",
        });

        setToken(response.data.jwtToken);

        // Retrieve points from localStorage
        const storedPoints = localStorage.getItem("userPoints");
        const points = storedPoints
          ? parseInt(storedPoints, 10)
          : response.data.user.point || 0;

        setUser({
          ...response.data.user,
          point: points,
        });

        router.push("/dashboard");
      } catch (error) {
        toast.error("Login with Google failed", {
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
