"use client";
import AuthService, { RegisterRequest } from "../services/authService";
import { useAuthState } from "../store/authStore";
import axiosResponseMessage from "@/lib/axiosResponseMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface RegisterResponse {
  status: string;
  message: string;
}

const useAuth = () => {
  const router = useRouter();
  // const { setUser, setToken, user, token, clearAuth } = useAuthState();

  const signUpMutation = useMutation({
    mutationFn: AuthService.register,
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
  });

  // const googleSignInMutation = useMutation({
  //   mutationFn: AuthService.googleSignIn,
  // });

  return {
    signUpMutation,
    loginMutation,
    //googleSignInMutation,
    //  // user,
    //   token,
    //   setUser,
    //   setToken,
    //   clearAuth,
  };
};

export default useAuth;
