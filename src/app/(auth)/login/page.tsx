"use client";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import MainHeader from "../../../components/ui/main-header";
import HeroText from "../../../components/ui/hero-text";
import googleLogo from "../../../../assets/icons/google.svg";
import Image from "next/image";
export default function Login() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-5">
        <div className="flex-1 lg:mr-8 mb-5 lg:mb-0">
          <HeroText />
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
          <h1 className="font-bold text-lg lg:mt-28 text-gray-600">
            Welcome Back
          </h1>
          <div className="w-full max-w-md">
            <Input
              type="email"
              placeholder="Email"
              className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <div className="flex justify-between w-full mb-3 whitespace-nowrap">
              <Link href="/reset" className="text-green-600">
                Forgot Password?
              </Link>
              <p className="text-green-600">
                <Link href="/register" className="text-green-600">
                  Register?
                </Link>
              </p>
            </div>
            <div className="mt-5 w-full">
              <Link href="/dashboard">
                <button className="bg-green-600 text-white w-full h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950">
                  Login
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center w-full mt-3">
              <p className="text-green-600 flex items-center">
                Or Sign in with{" "}
                <Link href="/google" className="ml-2">
                  <Image
                    src={googleLogo}
                    alt="Google logo"
                    width={20}
                    height={20}
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
