"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import HeaderText from "@/components/ui/header-text";
import FormError from "@/components/FormError";
export default function ResetPassword() {
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
            <FormError error="Email is required" />
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
