"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Modal from "../../components/ui/modal"; // Adjust the import path as needed
import profileImg from "../../../assets/icons/profile.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthState } from "../../../store/authStore";

export default function MainHeader() {
  const { user } = useAuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This state should be set based on actual login status
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profileImg); // State to store avatar URL
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isActive = (href: string) => path.startsWith(href);

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-950 flex items-center justify-between p-6 md:p-8">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl">
        HealthPadi
      </h1>
      {isLoggedIn && (
        <>
          {/* Navbar links for larger screens */}
          <div className="hidden md:flex flex-grow md:justify-start md:pl-48">
            <nav>
              <ul className="flex gap-6 md:gap-12 items-center">
                <li
                  className={
                    isActive("/about")
                      ? "bg-yellow-300  border border-green-600 p-2 rounded-md"
                      : ""
                  }
                >
                  <Link href="/about" className="text-white ">
                    About Us
                  </Link>
                </li>
                <li
                  className={
                    isActive("/update")
                      ? "bg-yellow-300  border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link href="/update" className="text-white ">
                    Health Update
                  </Link>
                </li>
                <li
                  className={
                    isActive("/report")
                      ? "bg-yellow-300  border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link href="/report" className="text-white ">
                    Create Report
                  </Link>
                </li>
                <li
                  className={
                    isActive("/dashboard")
                      ? "bg-yellow-300 text-green-600 border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link href="/dashboard" className="text-white">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Dropdown for profile and settings */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Avatar className="cursor-pointer bg-white p-1">
                  <AvatarFallback className="bg-green-500 text-white">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 right-0 md:right-auto">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="hover:bg-yellow-300"
                    onClick={openModal}
                  >
                    Profile
                    <DropdownMenuShortcut />
                  </DropdownMenuItem>

                  {/* Items visible only on smaller screens */}
                  <div className="block md:hidden">
                    <DropdownMenuItem>
                      <Link
                        href="/about"
                        className="text-black hover:text-yellow-300"
                      >
                        About Us
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/update"
                        className="text-black hover:text-yellow-300"
                      >
                        Health Update
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/report"
                        className="text-black hover:text-yellow-300"
                      >
                        Create Report
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/dashboard"
                        className="text-black hover:text-yellow-300"
                      >
                        Home
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Log out
                  <DropdownMenuShortcut>
                    <LogOut className="h-5 w-5 text-xl" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Modal isVisible={isModalVisible} onClose={closeModal}>
            {/* Add the content you want to display inside the modal here */}
            <div className="p-4">
              <h2 className="text-xl font-bold"></h2>
              {/* Add more content as needed */}
            </div>
          </Modal>
        </>
      )}
    </header>
  );
}
