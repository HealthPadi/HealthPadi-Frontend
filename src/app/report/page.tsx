"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import enableLocation from "../../../assets/icons/enable location.svg";
import disableLocation from "../../../assets/icons/disable location.svg";
import chatIcon from "../../../assets/icons/chat Icon.svg";
import Link from "next/link";
import healthPadi from "../../../public/images/healthPadi.png";
import MainHeader from "../../components/ui/main-header";
import FormError from "@/components/FormError";

// Define the AddressComponent interface
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export default function CreateReport() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAdi6ZdkYtYS5v-v-LVAYGwtobv7PMLz8o`
            );
            const addressComponents: AddressComponent[] =
              response.data.results[0].address_components;
            const city = addressComponents.find((component: AddressComponent) =>
              component.types.includes("locality")
            )?.long_name;
            const country = addressComponents.find(
              (component: AddressComponent) =>
                component.types.includes("country")
            )?.long_name;
            setLocation(`${city}, ${country}`);
            setError("");
            setLocationEnabled(true);
          } catch (err) {
            setError("Unable to retrieve your location.");
            setLocationEnabled(false);
          }
        },
        (err) => {
          setError("Unable to retrieve your location.");
          setLocationEnabled(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocationEnabled(false);
    }
  };

  const handleToggleLocation = () => {
    if (locationEnabled) {
      setLocation("");
      setLocationEnabled(false);
    } else {
      handleGetLocation();
    }
  };

  return (
    <>
      <MainHeader />
      <div className="px-6 md:px-24 pt-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
        <div>
          <h1 className="text-green-600 text-6xl mb-4">Reports</h1>
          <p className="mb-6 mt-6 text-gray-600">
            You can create a detailed health report tailored to your location,
            helping you stay informed and proactive about your health.
          </p>
          <Image
            src={healthPadi}
            alt="an image of a hospital"
            width={200}
            height={200}
            unoptimized
            className="mx-auto md:w-auto"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-gray-600">
            Create Report
          </h1>
          <div className="flex flex-col mb-6">
            {/* Uncomment this if you need a keyword search input */}
            {/* <Input
              type="text"
              placeholder="Search keywords"
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            /> */}
          </div>
          <div className="flex items-center mb-6">
            <Input
              type="text"
              placeholder="Location"
              value={location}
              readOnly
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <Image
              src={locationEnabled ? enableLocation : disableLocation}
              alt={locationEnabled ? "disable location" : "enable location"}
              width={30}
              height={30}
              className="ml-3 cursor-pointer"
              onClick={handleToggleLocation}
            />
          </div>
          <h1 className="text-xl font-bold mb-4 text-gray-600">
            Report Description
          </h1>
          <textarea className="w-full h-40 md:h-56 mb-6 outline-none border-2 rounded-md border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 p-3" />
          <FormError error="Description is required" />
          <Link href="/">
            <button className=" bg-green-600 text-white w-full h-12 md:h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950">
              Submit
            </button>
          </Link>
          <Link href="/chat" className="mt-10 self-end">
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </Link>
        </div>
      </div>
    </>
  );
}
