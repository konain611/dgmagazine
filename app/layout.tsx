import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import SubNavbar from "@/components/subnavbar";
import Footer from "@/components/footer";


import { AuthProvider } from "@/components/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DG Magazine",
  description: "Created by Diginfo teams of Developers, Generated using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ← Wrap absolutely everything inside AuthProvider */}
        <AuthProvider>
          <Navbar />
          <SubNavbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
