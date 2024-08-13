import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // specify the weights you need
});

export const metadata: Metadata = {
  title: "HealthPadi",
  description:
    "HealthPadi is a health platform that provides health information and resources to help you have access to health update within your location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className}`}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
