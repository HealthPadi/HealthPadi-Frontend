"use client";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // specify the weights you need
});

// export const metadata: Metadata = {
//   title: "HealthPadi",
//   description:
//     "HealthPadi is a health platform that provides health information and resources to help you have access to health update within your location.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={`${montserrat.className}`}>
      <body className={montserrat.className}>
        <GoogleOAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
            "426772133550-1faimalqo3vc108ocsfb4j998uicp8o2.apps.googleusercontent.com"
          }
        >
          <QueryClientProvider client={queryClient}>
            <main>{children}</main>
          </QueryClientProvider>
        </GoogleOAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
