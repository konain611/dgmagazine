import Image from "next/image";
import Link from "next/link";

interface InfoCardProps {
  heading: string;
  image: string;
  link: string;
}

export default function InfoCard({ heading, image, link }: InfoCardProps) {
  return (
    <div className="relative w-80 mb-7 bg-gray-50 border border-gray-200 p-3 shadow-sm">
      {/* Ribbon */}
      <div
        className="
          absolute top-0 left-0 
          bg-[#003366] text-white text-s font-semibold uppercase 
         py-1 w-full text-center"
      >
        {heading}
      </div>

      {/* Image */}
      <Link href={link} className="block mt-12">
        <Image
          src={image}
          alt={heading}
          width={250}
          height={150}
          className="w-full h-auto object-cover"
        />
      </Link>
    </div>
  );
}
