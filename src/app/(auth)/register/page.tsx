"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import googleLogo from "../../../../assets/icons/logo-google.svg";
import Image from "next/image";
import HeaderText from "@/components/ui/header-text";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import FormError from "@/components/FormError";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUpMutation } = useAuth();

  const RegisterSchema = z
    .object({
      firstName: z.string().min(1, { message: "First Name is required" }),
      lastName: z.string().min(1, { message: "Last Name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      roles: z.array(z.string()),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .refine(
          (data) => {
            const regex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]).+$/;
            return regex.test(data);
          },
          {
            message:
              "Password must have at least one number, one uppercase and one lowercase letter, one special character",
          }
        ),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirm Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type RegisterFormValues = z.infer<typeof RegisterSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: ["user"],
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      roles: data.roles,
    };

    await signUpMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        console.log(data);
        // toast.success("Registration successful");
        toast.success("Registration successful", {
          duration: 1000,

          icon: "✅",
        });
        router.push("/dashboard");
      },
      onError: (error: any) => {
        console.log(error);
        // toast.error(error.response?.data?.message);
        toast.error("Registration unsuccessful", {
          duration: 1000,

          icon: "❌",
        });
      },
    });
  };

  return (
    <>
      <HeaderText />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-5">
        <div className="flex-1 lg:mr-8 mb-5 lg:mb-0">
          <div className="flex flex-col items-start mt-16 md:mt-28 pl-4 md:pl-8">
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
          <h1 className="font-bold text-lg lg:mt-28 text-gray-600">
            Get Started
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-lg"
          >
            <div className="w-full">
              <Input
                type="text"
                placeholder="First Name"
                {...form.register("firstName")}
                className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <FormError error={form.formState.errors.firstName?.message} />
              <Input
                type="text"
                placeholder="Last Name"
                {...form.register("lastName")}
                className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <FormError error={form.formState.errors.lastName?.message} />
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
              <Input
                type="password"
                placeholder="Confirm Password"
                {...form.register("confirmPassword")}
                className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none"
              />
              <FormError
                error={form.formState.errors.confirmPassword?.message}
              />
              <div className="flex justify-between w-full mb-3 whitespace-nowrap">
                <Link href="/reset" className="text-green-600">
                  Forgot Password?
                </Link>
                <p className="text-green-600">
                  <Link href="/login" className="text-green-600">
                    Login
                  </Link>
                </p>
              </div>
              <div className="mt-5 w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white w-full h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950 flex justify-center items-center"
                >
                  {signUpMutation.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <div className="flex justify-center items-center w-full mt-3">
                <Link href="" className="text-green-600 flex items-center">
                  Or Sign in with{" "}
                  <Image
                    src={googleLogo}
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
