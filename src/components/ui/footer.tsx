import Image from "next/image";
import facebookLogo from "../../../assets/icons/logo-facebook.svg";
import linkedinLogo from "../../../assets/icons/logo-instagram.svg";
import youTubeLogo from "../../../assets/icons/logo-youtube.svg";
import instagramLogo from "../../../assets/icons/logo-linkedin.svg";

export default function Footer() {
  return (
    <footer className="p-10 m-30 bg-green-600">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-4">
          <Image
            className="t-[8px] l-[8px]"
            src={facebookLogo}
            alt="facebook logo"
            width={24}
            height={24}
          />
          <Image
            className="t-[8px] l-[8px]"
            src={linkedinLogo}
            alt="linkedin logo"
            width={24}
            height={24}
          />
          <Image
            className="t-[8px] l-[8px]"
            src={youTubeLogo}
            alt="youtube logo"
            width={24}
            height={24}
          />
          <Image
            className="t-[8px] l-[8px]"
            src={instagramLogo}
            alt="instagram logo"
            width={24}
            height={24}
          />
        </div>
      </div>
    </footer>
  );
}
