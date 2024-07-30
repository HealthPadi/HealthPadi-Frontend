import Link from "next/link";

export default function HeroText() {
  return (
    <div className="px-6 md:px-24 pt-8 md:pt-16 pb-6 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col items-start">
        <h1
          className="font-bold text-3xl md:text-5xl text-gray-600 leading-relaxed md:leading-snug"
          style={{ lineHeight: "1.3", whiteSpace: "normal" }}
        >
          Connecting Communities
          <br /> to Better Health
        </h1>
        <p className="pt-4 text-xl md:text-2xl text-gray-600">
          Bridging Health Gaps in Your Community
        </p>
        {/* <Link href="/login" passHref>
          <div className="flex items-center justify-center bg-green-600 rounded-lg text-white w-[140px] md:w-[160px] h-[40px] md:h-[50px] mt-6 md:mt-12">
            Login
          </div>
        </Link> */}
      </div>
    </div>
  );
}
