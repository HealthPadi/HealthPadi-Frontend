"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import MainHeader from "../../../components/ui/main-header";
import HeroText from "../../../components/ui/hero-text";

export default function ResetPassword() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-5">
        <div className="flex-1 lg:mr-8 mb-5 lg:mb-0">
          <HeroText />
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
          <h1 className="font-bold text-lg lg:mt-28 text-gray-600">
            Reset Your Password
          </h1>
          <p className="text-gray-600 mb-3">
            Kindly input the email you signed up with on{" "}
            <span className="text-green-600 text-lg">HealthPadi,</span> <br />
            we’ll send you a password reset email.
          </p>
          <div className="w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <div className="mt-5 w-full">
              <button className="bg-green-600 text-white w-full h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950">
                Send Reset Link
              </button>
            </div>
            <p className="text-green-600 mt-3">
              <Link href="/login">Back to login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
