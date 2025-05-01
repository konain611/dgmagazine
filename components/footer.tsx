"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 b-">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
       

          <div className="space-y-8">
            <Image
              src="/logo-h.jpg"
              alt="DG Magazine Cyber Security logo"
              width={150}
              height={60}
              className="h-auto w-auto"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              DGMAGAZINE powered by DG ACADEMY and R&D Team. Supported by DIGINFO
              to provide a holistic view of cyber security to drive the cyber
              security community.
            </p>
            <p className="text-sm text-gray-600">
              Contact us:{" "}
              <a href="mailto:info@dgmagazine.net" className="text-[#003366] hover:underline">
                info@dgmagazine.net
              </a>
            </p>
          </div>

          {/* Recent Posts */}
          <div className="space-y-5">
            <div className="relative">
              <h3 className="text-lg font-semibold text-[#003366] mb-6">
                <span className="bg-[#003366] text-white text-[15px] font-semibold px-13 py-2 clip-ribbon">
                  RECENT POSTS
                </span>
              </h3>
            </div>
          
          </div>

          {/* Subscription */}
          <div className="space-y-5">
            <div className="relative">
              <h3 className="text-lg font-semibold text-[#003366] mb-6">
                <span className="bg-[#003366] text-white  text-[15px] font-semibold px-13 py-2 clip-ribbon">
                  SUBSCRIPTION
                </span>
              </h3>
            </div>
            <p className="text-[16px] text-gray-600">
              Subscribe Now to Receive Free Cyber Security Report
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-[#003366] text-sm"
              />
              <button
                type="submit"
                className="bg-[#003366] text-white w-full py-2 rounded-md hover:bg-[#002244] transition-colors text-sm font-semibold"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div className="space-y-5">
            <div className="relative">
              <h3 className="text-lg font-semibold text-[#003366] mb-6">
                <span className="bg-[#003366] text-white  text-[15px] font-semibold px-13 py-2 clip-ribbon">
                  SOCIAL MEDIA
                </span>
              </h3>
            </div>
            <div className="flex items-center space-x-5">
              {[
                { icon: "facebook-f", color: "#3b5998" },
                { icon: "twitter", color: "#1da1f2" },
                { icon: "linkedin-in", color: "#0077b5" },
                { icon: "youtube", color: "#ff0000" },
                { icon: "instagram", color: "#e4405f" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href="#"
                  className="text-2xl hover:opacity-75 transition-opacity"
                  style={{ color: social.color }}
                >
                  <i className={`fab fa-${social.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-300" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>
            All Rights Reserved by DIGINFO. 2021 Copyright© 2021-2022 DIGINFO GROUP |{" "}
            <a href="/terms-and-policy" className="text-[#003366] hover:underline">
              Terms & Policy
            </a>
          </p>
        </div>
      </div>

      {/* Ribbon Style */}
      <style jsx>{`
        .clip-ribbon {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
