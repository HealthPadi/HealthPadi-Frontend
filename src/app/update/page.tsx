"use client";
import MainHeader from "../../components/ui/main-header";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "lucide-react";
import healthbadge from "../../../public/images/healthbadge.png";
import enableLocation from "../../../assets/icons/enable location.svg";
import disableLocation from "../../../assets/icons/disable location.svg";
import chatIcon from "../../../assets/icons/chat Icon.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import useHealthUpdate from "../../hooks/useHealthUpdate";
import type { HealthUpdate } from "../../services/healthUpdateService";
import ChatModal from "../../components/ChatModal";
import axiosConfig from "../../config/axios";

// Define the AddressComponent interface
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export default function HealthUpdate() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [healthUpdate, setHealthUpdate] = useState<HealthUpdate | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [healthUpdateId, setHealthUpdateId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { getHealthUpdatesQuery, useGetHealthUpdateByIdQuery } =
    useHealthUpdate();

  useEffect(() => {
    if (location && !locationEnabled) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=AIzaSyAdi6ZdkYtYS5v-v-LVAYGwtobv7PMLz8o`
          );
          const predictions = response.data.predictions;
          setSuggestions(
            predictions.map((prediction: any) => prediction.description)
          );
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [location, locationEnabled]);

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

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    if (e.target.value) {
      setLocationEnabled(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setModalMessage("Your health update is on its way...");
    setShowModal(true);
    try {
      const response = await axiosConfig.get(
        `/api/report?location=${location}`
      );
      const data = response.data.data;
       if (data.length > 0) {
        setHealthUpdate(data[0]);
        setModalMessage(`Health update for ${location}: ${data[0].update}`);
      } else {
        setModalMessage(
          `There is no health update for ${location} at the moment. Check back later :( .`
        );
      }
    } catch (error) {
      setModalMessage(
        "Failed to fetch health updates. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setHealthUpdate(null);
  };

  const handleChatIconClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const healthUpdateQuery = useGetHealthUpdateByIdQuery(healthUpdateId || "");

  return (
    <>
      <MainHeader />
      <div className="mt-10 px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
        <div className="ml-0 md:ml-10">
          <h1 className="text-lg text-gray-600 font-bold mb-2">
            Get Health Update
          </h1>
          <div className="flex items-center mb-3"></div>
          <div className="flex items-center mb-3 relative">
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="w-full h-12 md:h-16 mb-3 outline-none border-green-600 focus:outline-none focus:ring-0 focus:border-transparent"
              disabled={locationEnabled}
            />
            <Image
              src={locationEnabled ? enableLocation : disableLocation}
              alt={locationEnabled ? "disable location" : "enable location"}
              width={30}
              height={30}
              className={`ml-3 cursor-pointer ${
                location ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={location ? undefined : handleToggleLocation}
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white w-full h-12 md:h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950"
          >
            Submit
          </button>
          <div>
            <Image
              src={healthbadge}
              alt="health badge"
              width={500}
              height={500}
              unoptimized
              className="mx-auto md:w-auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center ml-0 md:ml-20">
          <div>
            <h1 className="text-4xl md:text-6xl leading-relaxed md:leading-snug text-green-600">
              Health <br />
              Updates
            </h1>
            <p className=" mt-8 text-base md:text-lg text-gray-500">
              You can get a detailed health report tailored to
              <br /> a location, helping you stay informed and
              <br /> proactive about your health.
            </p>
            {/* <h3 className="text-gray-800 text-lg md:text-xl font-bold mt-5 md:mt-25 ">
              Stay informed about the latest health news, alerts, and advice
              relevant to your area by staying connected.
            </h3> */}
          </div>
          <button
            onClick={handleChatIconClick}
            className="mb-20 md:mt-auto self-end"
          >
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            {isLoading ? (
              <div className="flex items-center justify-center ">
                <Loader className="animate-spin mr-2" />
                <span>{modalMessage}</span>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Health Update</h2>
                <p>{modalMessage}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* {healthUpdateQuery && healthUpdateQuery.isSuccess && (
        <div>
          <h2>Health Update Details</h2>
          <p>{JSON.stringify(healthUpdateQuery.data)}</p>
        </div>
      )} */}
      {isChatOpen && (
        <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
      )}
    </>
  );
}
