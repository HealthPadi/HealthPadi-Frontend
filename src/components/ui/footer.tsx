//This is the footer component of the application that contains links to the social media pages of HealthPadi. It also contains the copyright information for the website.

import Image from "next/image";
import facebookLogo from "../../../assets/icons/logo-facebook.svg";
import linkedinLogo from "../../../assets/icons/logo-instagram.svg";
import youTubeLogo from "../../../assets/icons/logo-youtube.svg";
import instagramLogo from "../../../assets/icons/logo-linkedin.svg";

export default function Footer() {
  return (
    <footer className="p-6 md:p-10 bg-gradient-to-r from-green-600 to-green-950">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={facebookLogo}
            alt="facebook logo"
            width={24}
            height={24}
          />
          <Image
            src={linkedinLogo}
            alt="linkedin logo"
            width={24}
            height={24}
          />
          <Image src={youTubeLogo} alt="youtube logo" width={24} height={24} />
          <Image
            src={instagramLogo}
            alt="instagram logo"
            width={24}
            height={24}
          />
        </div>
        <p className="text-white text-sm md:text-base mt-4 md:mt-0">
          &copy; HealthPadi 2024
        </p>
      </div>
    </footer>
  );
}
