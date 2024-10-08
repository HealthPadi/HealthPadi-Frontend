"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import googleLogo from "../../../../assets/icons/logo-google.svg";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import FormError from "@/components/FormError";
import useAuth from "../../../hooks/useAuth";
import { useAuthState } from "@/store/authStore";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthState(); // Add setUser and setToken to update user state

  const { loginMutation, googleLogin } = useAuth();
  const LoginSchema = z.object({
    email: z.string().email({
      message: "Invalid username or email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });

  type LoginFormValues = z.infer<typeof LoginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const payload = {
      email: data.email,
      password: data.password,
    };

    await loginMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        toast.success("Login successful", {
          duration: 1000,
          icon: "🎉",
        });

        // Retrieve points from localStorage
        const storedPoints = localStorage.getItem("userPoints");
        const points = storedPoints
          ? parseInt(storedPoints, 10)
          : (data.data.user as any).point || 0;

        // Update the user and token in the auth store
        setUser({
          ...data.data.user,
          point: points,
        });
        setToken(data.data.jwtToken);

        setIsLoading(false);

        // Define the admin email
        const adminEmail = "bob.johnson@example.com";

        // Redirect based on the email
        if (data.data.user.email === adminEmail) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      },
      onError: (error: any) => {
        toast.error("Login failed", {
          duration: 1000,
          icon: "❌",
        });
        setIsLoading(false);
      },
    });
  };

  const googleSignin = async () => {
    googleLogin();
  };

  return (
    <>
      <HeaderText />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-5 mt-[-3rem]">
        <div className="flex-1 lg:mr-8 mb-5 lg:mb-0">
          <div className="flex flex-col items-start mt-12 md:mt-24 pl-4 md:pl-8">
            <h1
              className="font-bold text-2xl md:text-4xl lg:text-5xl text-gray-600 leading-snug md:leading-tight"
              style={{ lineHeight: "1.2", whiteSpace: "normal" }}
            >
              Connecting Communities
              <br /> to Better Health
            </h1>
            <p className="pt-2 md:pt-4 text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Bridging Health Gaps in Your Community
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
          <h1 className="font-bold text-lg lg:mt-24 text-gray-600">
            Welcome Back
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg"
          >
            <div className="w-full">
              <Input
                type="email"
                placeholder="Email"
                {...form.register("email")}
                className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <FormError error={form.formState.errors.email?.message} />
              <Input
                type="password"
                placeholder="Password"
                {...form.register("password")}
                className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <FormError error={form.formState.errors.password?.message} />
              <div className="flex justify-between w-full mb-3 whitespace-nowrap">
                <Link href="/reset" className="text-green-600">
                  Forgot Password?
                </Link>
                <p className="text-green-600">
                  <Link href="/register" className="text-green-600">
                    Register
                  </Link>
                </p>
              </div>
              <div className="mt-5 w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white w-full h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950 flex justify-center items-center"
                >
                  {isLoading ? <Loader className="animate-spin" /> : "Login"}
                </button>
              </div>
              <div className="flex justify-center items-center w-full mt-3">
                <button
                  type="button"
                  className="text-green-600 flex items-center"
                  onClick={googleSignin}
                >
                  Or Sign in with{" "}
                  <Image
                    src={googleLogo}
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
