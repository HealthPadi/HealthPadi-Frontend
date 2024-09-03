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
import Modal from "../../components/ui/modal";
import profileImg from "../../../assets/icons/profile.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthState } from "../../../store/authStore";

export default function MainHeader() {
  const { user } = useAuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profileImg);
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
    <header className="bg-gradient-to-r from-green-600 to-green-950 flex items-center justify-between p-3 md:p-4 lg:p-3">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl lg:text-2xl">
        HealthPadi
      </h1>
      {isLoggedIn && (
        <>
          <div className="hidden md:flex flex-grow md:justify-center md:pl-12 lg:pl-24 xl:pl-48">
            <nav>
              <ul className="flex gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-center justify-center">
                <li
                  className={
                    isActive("/dashboard")
                      ? "bg-yellow-300 border border-green-600 p-2 rounded-md"
                      : ""
                  }
                >
                  <Link
                    href="/dashboard"
                    className="text-white text-sm md:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li
                  className={
                    isActive("/update")
                      ? "bg-yellow-300 border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link
                    href="/update"
                    className="text-white text-sm md:text-base"
                  >
                    Health Update
                  </Link>
                </li>
                <li
                  className={
                    isActive("/report")
                      ? "bg-yellow-300 border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link
                    href="/report"
                    className="text-white text-sm md:text-base"
                  >
                    Create Report
                  </Link>
                </li>
                <li
                  className={
                    isActive("/about")
                      ? "bg-yellow-300 text-green-600 border border-green-600 p-2 rounded-lg"
                      : ""
                  }
                >
                  <Link
                    href="/about"
                    className="text-white text-sm md:text-base"
                  >
                    About
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
                        href="/dashboard"
                        className="text-black hover:text-yellow-300"
                      >
                        Home
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
                        href="/about"
                        className="text-black hover:text-yellow-300"
                      >
                        About us
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
