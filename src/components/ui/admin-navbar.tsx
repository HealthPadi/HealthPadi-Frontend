"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "../../store/authStore";
import profileImg from "../../../assets/icons/profile.svg";

export default function AdminNavbar() {
  const { user } = useAuthState();
  const [avatarUrl, setAvatarUrl] = useState(profileImg);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Clear user state and token here if needed
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-950 flex items-center justify-between p-3 md:p-4 lg:p-3">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl lg:text-2xl">
        HealthPadi
      </h1>
      {user && (
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
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <LogOut className="h-5 w-5 text-xl ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
