import React from "react";

interface HomeLayoutProps {
  left: React.ReactNode;
  middle: React.ReactNode;
  right: React.ReactNode;
}

export default function HomeLayout({ left, middle, right }: HomeLayoutProps) {
  return (
    <div className="max-w-[90%] mx-auto px-4 py-8">
      {/* Mobile (360px-600px) - Single column */}
      <div className="flex flex-col space-y-6 sm:hidden">
        <section>{left}</section>
        <aside>{middle}</aside>
        <aside>{right}</aside>
      </div>

      {/* Small tablets (601px-767px) - 2 columns */}
      <div className="hidden sm:grid md:hidden grid-cols-[60%_35%] gap-5">
        <section>{left}</section>
        <div className="flex flex-col space-y-6">
          <aside>{middle}</aside>
          <aside>{right}</aside>
        </div>
      </div>

      {/* Tablets (768px-1279px) - 3 columns with original proportions */}
      <div className="hidden md:grid lg:hidden grid-cols-[50%_20%_20%] gap-[5%]">
        <section>{left}</section>
        <aside className="min-w-[160px]">{middle}</aside>
        <aside className="min-w-[160px]">{right}</aside>
      </div>

      {/* Desktop (1280px+) - 3 columns with larger min-width */}
      <div className="hidden lg:grid grid-cols-[50%_20%_20%] gap-[5%]">
        <section>{left}</section>
        <aside className="min-w-[200px]">{right}</aside>
        <aside className="min-w-[200px]">{middle}</aside>
      </div>
    </div>
  );
}