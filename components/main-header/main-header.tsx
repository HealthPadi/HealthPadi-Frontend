"use client";
import { useState } from "react";
import Image from "next/image";
import dropdown from "../../assets/icons/dropdown.svg";
import profileImg from "../../assets/icons/profile.svg";
import NavLink from "../../components/main-header/nav-link"; // Adjust the import path as needed

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This state should be set based on actual login status
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="bg-green-600 flex items-center justify-between p-6 md:p-8">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl">
        HealthPadi
      </h1>
      {isLoggedIn && (
        <nav className="hidden md:flex-grow md:flex md:justify-start md:pl-48">
          <ul className="flex gap-6 md:gap-12 items-center">
            <li>
              <NavLink href="/aboutUs">About Us</NavLink>
            </li>
            <li>
              <NavLink href="/update">Health Update</NavLink>
            </li>
            <li>
              <NavLink href="/report">Create Report</NavLink>
            </li>
            <li>
              <NavLink href="/dashboard">Home</NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <Image
            src={profileImg}
            alt="profile image"
            width={30}
            height={30}
            className="md:w-[40px] md:h-[40px] rounded-full"
          />
          {isLoggedIn && (
            <Image
              src={dropdown}
              alt="dropdown"
              width={20}
              height={15}
              className="ml-2 md:w-[30px] md:h-[20px]"
            />
          )}
        </div>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            {!isLoggedIn && (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">Register</NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavLink href="/profile">Profile</NavLink>
                <NavLink href="/logout">Logout</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
