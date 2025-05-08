import React from "react";

interface HomeLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function HomeLayout2({ left, right }: HomeLayoutProps) {
  return (
    <div className="max-w-[90%] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[70%_25%] gap-y-8 md:gap-[5%]">
      <section className="order-1 md:order-none">{left}</section>
      <aside className="order-2 md:order-none">{right}</aside>
    </div>
  );
}