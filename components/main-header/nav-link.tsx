"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();

  const isActive = path.startsWith(href);
  const baseClasses = "text-white px-4 py-2";
  const activeClasses = isActive
    ? "bg-yellow-500 text-green-600 border border-green-600 rounded-lg p-2 m-2"
    : "";

  return (
    <Link href={href} className={`${baseClasses} ${activeClasses}`}>
      {children}
    </Link>
  );
}
