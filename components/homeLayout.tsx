import React from "react";

interface HomeLayoutProps {
  left: React.ReactNode;
  middle: React.ReactNode;
  right: React.ReactNode;
}

export default function HomeLayout({ left, middle, right }: HomeLayoutProps) {
  return (
    <div className="max-w-[90%] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[50%_20%_20%] gap-y-8 md:gap-[5%]">
      <section className="order-1 md:order-none">{left}</section>
      <aside className="order-2 md:order-none">{middle}</aside>
      <aside className="order-3 md:order-none">{right}</aside>
    </div>
  );
}
