import { useState } from "react";
import Image from "next/image";
import dropdown from "../../assets/icons/dropdown.svg";
import profileImg from "../../assets/icons/profile.svg";
import Link from "next/link";

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This state should be set based on actual login status
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
              <Link
                href="/aboutUs"
                className="text-white hover:text-yellow-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/healthUpdates"
                className="text-white hover:text-yellow-200"
              >
                Health Update
              </Link>
            </li>
            <li>
              <Link
                href="/createReport"
                className="text-white hover:text-yellow-200"
              >
                Create Report
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-white hover:text-yellow-200"
              >
                Home
              </Link>
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
                <Link
                  href="/login"
                  className="block px-4 py-2 text-green-600 hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-green-600 hover:bg-gray-200"
                >
                  Register
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
