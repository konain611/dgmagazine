import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  heading: string;
  image: string;
  link: string;
}

export default function InfoCard({ heading, image, link }: InfoCardProps) {
  return (
    <div className="relative w-full xs:w-72 sm:w-64 md:w-56 lg:w-72 xl:w-80 mb-7 bg-gray-50 border border-gray-200 p-3 shadow-sm">
      {/* Ribbon - responsive font size and padding */}
      <div className="
        absolute top-0 left-0 
        bg-[#003366] text-white 
        text-xs sm:text-sm font-semibold uppercase 
        py-1 px-2 sm:py-1.5 w-full text-center
      ">
        {heading}
      </div>

      {/* Image Container - responsive spacing */}
      <Link href={link} className="block mt-10 sm:mt-12">
        <Image
          src={image}
          alt={heading}
          width={300}
          height={180}
          className="w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, 
                (max-width: 768px) 50vw,
                (max-width: 1024px) 33vw,
                25vw"
        />
      </Link>
    </div>
  );
}