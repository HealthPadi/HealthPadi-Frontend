"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../components/ui/input";
import enableLocation from "../../../assets/icons/enable location.svg";
import disableLocation from "../../../assets/icons/disable location.svg";
import chatIcon from "../../../assets/icons/chat Icon.svg";
import Link from "next/link";
import healthPadi from "../../../public/images/healthPadi.png";
import MainHeader from "../../components/ui/main-header";
import FormError from "@/components/FormError";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import ChatModal from "../../components/ChatModal";
import axiosConfig from "../../config/axios";
import { useAuthState } from "../../store/authStore";
import useReport from "../../hooks/useReport";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { user } = useAuthState();
  const { createReportMutation } = useReport();

  console.log("User:", user);
  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm();

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
    setLocationEnabled(false); // Disable the toggle when typing
    if (e.target.value) {
      setLocationEnabled(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const onSubmit = (data: any) => {
    if (!data.description) {
      setFormError("description", {
        type: "required",
        message: "Description is required",
      });

      return;
    }
    setIsLoading(true);
    console.log("Submitting report with data:", {
      location: location,
      userId: user?.id?.toString() ?? "",
      content: data.description,
    });
    createReportMutation.mutate(
      {
        location: location,
        userId: user?.id?.toString() ?? "",
        content: data.description,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          setModalMessage(
            "Yaay!! your report has been submitted successfully 🎉"
          );
          setShowModal(true);
        },
        onError: (error) => {
          console.error("Error submitting report:", error);
          setIsLoading(false);
          setModalMessage("Failed to submit report. Please try again later.");
          setShowModal(true);
        },
      }
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChatIconClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
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
            width={100}
            height={100}
            unoptimized
            className="mx-auto md:w-auto"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-gray-600">
            Create Report
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center mb-6 relative">
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
                className={`ml-3 cursor-pointer`}
                onClick={handleToggleLocation}
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
            <h1 className="text-xl font-bold mb-4 text-gray-600">
              Report Description
            </h1>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full h-40 md:h-56 mb-6 outline-none border-2 rounded-md border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 p-3"
            />
            {errors.description && (
              <FormError error={errors.description.message as string} />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-green-600 text-white w-full h-12 md:h-14 mb-3 rounded-sm hover:bg-gradient-to-r from-green-600 to-green-950 text-center flex items-center justify-center"
            >
              {isLoading ? <Loader className="animate-spin " /> : "Submit"}
            </button>
          </form>
          <button onClick={handleChatIconClick} className="mt-10 self-end">
            <Image src={chatIcon} alt="chat icon" width={60} height={60} />
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" />
                <span>{modalMessage}</span>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Report Submission</h2>
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
      {isChatOpen && (
        <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
      )}
    </>
  );
}
