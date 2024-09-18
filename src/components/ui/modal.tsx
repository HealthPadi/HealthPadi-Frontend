"use client";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useAuthState } from "../../store/authStore";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  const { user, setUser } = useAuthState(); // Assuming setUser is available in the auth store
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [newProfileImg, setNewProfileImg] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", { firstName, lastName, email });

    // Update the user state in the auth store
    setUser({
      ...user,
      firstName: firstName ?? user?.firstName ?? "",
      lastName: lastName ?? user?.lastName ?? "",
      email: email ?? user?.email ?? "",
      id: user?.id ?? 0, // Ensure id is always defined
    });

    toast.success("Profile updated successfully!", {
      duration: 1000,
      icon: "🎉",
    });
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80"
      onClick={handleOutsideClick}
    >
      <Toaster />
      <div
        ref={modalRef}
        className="bg-white border border-green-600 rounded-lg relative w-[400px] h-[600px]"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-950 w-full h-12 rounded-t-lg flex items-center justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center mb-2 mt-2">
          <h2 className="text-4xl text-green-600">My Profile</h2>
          <div className="relative w-20 h-20 mt-6">
            {newProfileImg ? (
              <Image
                src={newProfileImg}
                alt="Profile"
                className="rounded-full w-full h-full object-cover border-2 border-green-600"
                width={80}
                height={80}
              />
            ) : (
              <div className="w-20 h-20 rounded-full border border-green-600 flex items-center justify-center">
                <span className="text-gray-500 p-2">No Image</span>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FaPlus className="absolute bottom-1 right-1 text-green-600 text-2xl cursor-pointer" />
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-green-600">
            {firstName} {lastName}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-4 mt-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full p-4 border border-green-600 rounded-sm"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full p-4 border border-green-600 rounded-sm"
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              disabled={true}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-4 border border-green-600 rounded-sm"
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-full p-4 bg-green-600 text-white font-semibold rounded-md hover:bg-gradient-to-r from-green-600 to-green-950"
            >
              Update Profile
            </button>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Modal;
