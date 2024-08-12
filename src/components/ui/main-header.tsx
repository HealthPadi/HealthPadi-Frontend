"use client";
import { useState } from "react";
import Image from "next/image";
import dropdown from "../../../assets/icons/dropdown.svg";
import profileImg from "../../../assets/icons/profile.svg";
import Link from "next/link";
import Modal from "../ui/modal"; // Adjust the import path as needed

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This state should be set based on actual login status
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openModal = () => {
    setIsModalVisible(true);
    setDropdownVisible(false); // Close the dropdown when modal opens
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-950 flex items-center justify-between p-6 md:p-8">
      <h1 className="font-bold text-yellow-200 text-2xl md:text-3xl">
        HealthPadi
      </h1>
      <div className="hidden md:flex flex-grow md:justify-start md:pl-48">
        <nav>
          <ul className="flex gap-6 md:gap-12 items-center">
            <li>
              <Link
                href="/aboutUs"
                className="text-white hover:text-yellow-200 active:bg-yellow-200 active:text-green-600"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link href="/update" className="text-white hover:text-yellow-200">
                Health Update
              </Link>
            </li>
            <li>
              <Link href="/report" className="text-white hover:text-yellow-200">
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
      </div>
      <div className="flex items-center justify-end flex-1 md:flex-none">
        <div className="relative md:hidden">
          <button onClick={toggleDropdown} className="flex items-center">
            <Image
              src={profileImg}
              alt="profile image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <Image
              src={dropdown}
              alt="dropdown"
              width={20}
              height={15}
              className="ml-2"
            />
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
              <Link
                href="/aboutUs"
                className="block px-4 py-2 text-green-600 hover:bg-gray-200"
              >
                About Us
              </Link>
              <Link
                href="/update"
                className="block px-4 py-2 text-green-600 hover:bg-gray-200"
              >
                Health Update
              </Link>
              <Link
                href="/report"
                className="block px-4 py-2 text-green-600 hover:bg-gray-200"
              >
                Create Report
              </Link>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-green-600 hover:bg-gray-200"
              >
                Home
              </Link>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={openModal}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </button>
                  <Link
                    href="/logout"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </Link>
                </>
              ) : (
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
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="relative hidden md:flex items-center ml-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <Image
                src={profileImg}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <Image
                src={dropdown}
                alt="dropdown"
                width={30}
                height={20}
                className="ml-2"
              />
            </div>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <button
                  onClick={openModal}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </button>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal isVisible={isModalVisible} onClose={closeModal} />
    </header>
  );
}
