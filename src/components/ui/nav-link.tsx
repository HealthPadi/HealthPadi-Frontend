//This is a simple component that renders a link to the main header component. It is used in the main layout component to provide a link to the main header on all pages.

"use client";
import Link from "next/link";
import MainHeader from "./main-header";

export default function NavLink() {
  return <MainHeader />;
}
