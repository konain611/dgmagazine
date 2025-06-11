"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const subDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
                setActiveSubDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Add this type definition at the top of your component
    type DropdownStructure = {
        [key: string]: {
            [key: string]: string[];
        };
    };

    // Then update your dropdownContent definition
    const dropdownContent: DropdownStructure = {
        NEWS: {
            "BREAKING NEWS": [],
            "NEWS UPDATES": [],
            "NEWS ARCHIVE": []
        },
        MAGAZINE: {
            "MESSAGE FROM THE CHIEF EDITOR": [],
            "EDITORIAL BOARD": []
        },
        RESEARCH: {
            "FEATURED ARTICLES": [],
            "TREND AND CHALLENGES": [],
            "CRITICAL INFRASTRUCTURE": [],
            "GOVERNANCE, RISK AND COMPLIANCE": [],
            "CYBER LAWS AND CRIME": [],
            "IDENTITY AND ACCESS MANAGEMENT": [],
            "VULNERABILITY MANAGEMENT AND PENETRATION TESTING": [],
            "TECHNOLOGY": [],
            "INNOVATION CYBER SECURITY": []
        },
        "ADVISORY ROOM": {
            "ADVICE FOR SECURITY LEADERS AND PROFESSIONALS": [],
            "LESSONS LEARNED": [],
            "CYBER CAREER GUIDANCE": []
        },
        "CYBER PRODUCTS": {
            "BUYERS GUIDE": [],
            "BEST CYBER SECURITY PRODUCTS": []
        },
        "CYBER AFFAIRS": {
            "CYBER POLITICS": [],
            "CYBER BUDGET": []
        },
        "CYBER AWARENESS": {},
        MEDIA: {
            "LIVE AND RECORDED MEDIA STREAMS": [],
            "EVENTS": []
        }
    };

    const handleItemClick = () => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileMenuOpen(false);
    };

    const handleDropdown = (item: string) => {
        if (isMobile) {
            setActiveDropdown(activeDropdown === item ? null : item);
            setActiveSubDropdown(null);
        } else {
            setActiveDropdown(item);
        }
    };

    const handleSubDropdown = (subItem: string) => {
        setActiveSubDropdown(activeSubDropdown === subItem ? null : subItem);
    };

    const closeAll = () => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileMenuOpen(false);
    };

    return (
        <div>
            <nav
                className="text-white bg-[#003366] shadow-lg flex flex-col md:flex-row items-center font-semibold sticky top-0 z-50 h-20"
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Logo and Mobile Menu Button */}
                <div className="w-full md:w-auto flex justify-between items-center h-full px-4 md:px-6 md:mr-8">
                    {/* Logo container */}
                    <div className="h-24 md:h-32 flex-shrink-0 relative z-20 top-7 left-7"> {/* Increased z-index */}
                        <Link
                            href="/"
                            onClick={handleItemClick}
                            className="block h-full"
                        >
                            <Image
                                src="/Logo.png"
                                alt="DGMagazine Logo"
                                width={140}
                                height={200}
                                className="h-full w-auto object-contain"
                            // style={{
                            //     minWidth: '120px',
                            //     maxWidth: '130px', // Constrain width
                            //     maxHeight: '200px' // Prevent excessive height
                            // }}
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white ml-auto z-10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navigation Links - Desktop */}
                <div
                    ref={dropdownRef}
                    className={`${mobileMenuOpen ? 'block' : 'hidden'} text-sm md:flex md:items-center justify-center md:space-x-2 w-full md:w-auto mt-4 bg-[#003366] md:mt-0 mx-auto`}
                >

                    {["NEWS", "MAGAZINE", "RESEARCH", "ADVISORY ROOM", "CYBER PRODUCTS", "CYBER AFFAIRS", "CYBER AWARENESS", "MEDIA"].map((item) => (
                        <div
                            key={item}
                            className="relative group py-1 md:py-0 w-full md:w-auto"
                            onMouseEnter={() => !isMobile && item !== "CYBER AWARENESS" && handleDropdown(item)}
                            onMouseLeave={() => !isMobile && closeAll()}
                        >
                            {item === "CYBER AWARENESS" ? (
                                <Link
                                    href="/cyber-awareness"
                                    onClick={handleItemClick}
                                    className="px-3 py-1.5 w-full md:w-auto flex justify-between items-center hover:text-[#FF9102]"
                                >
                                    {item}
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleDropdown(item)}
                                        className={`px-3 py-1.5 w-full md:w-auto flex justify-between items-center hover:text-[#FF9102] ${activeDropdown === item ? 'text-[#FF9102]' : ''}`}
                                    >
                                        {item}
                                        <span className="ml-1">
                                            {isMobile ? (activeDropdown === item ? '▴' : '▾') : '▾'}
                                        </span>
                                    </button>

                                    {/* Dropdown Content */}
                                    {activeDropdown === item && (
                                        <div
                                            className="md:absolute left-0 bg-[#FF9102] text-[#003366] shadow-lg w-full md:w-48"
                                            onMouseLeave={() => !isMobile && setActiveSubDropdown(null)}
                                        >
                                            <ul className="py-1">
                                                {Object.entries(dropdownContent[item as keyof typeof dropdownContent]).map(([subItem, subSubItems]) => (
                                                    <li
                                                        key={subItem}
                                                        className="relative border-t border-gray-100 first:border-0"
                                                        onMouseEnter={() => !isMobile && setActiveSubDropdown(subItem)}
                                                    >
                                                        <div className="flex justify-between items-center px-3 py-2 hover:bg-gray-50">
                                                            {subSubItems.length > 0 ? (
                                                                <button
                                                                    onClick={() => handleSubDropdown(subItem)}
                                                                    className="w-full text-left flex justify-between items-center text-xs"
                                                                >
                                                                    {subItem}
                                                                    {subSubItems.length > 0 && (
                                                                        <span>{isMobile ? (activeSubDropdown === subItem ? '▴' : '▾') : '▸'}</span>
                                                                    )}
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    onClick={closeAll}
                                                                    className="block w-full text-xs"
                                                                >
                                                                    {subItem}
                                                                </Link>
                                                            )}
                                                        </div>

                                                        {/* Subdropdown Content */}
                                                        {activeSubDropdown === subItem && subSubItems.length > 0 && (
                                                            <div
                                                                ref={subDropdownRef}
                                                                className={`${isMobile
                                                                    ? 'pl-3 bg-gray-50'
                                                                    : 'md:absolute md:left-full md:top-0 md:min-w-[200px] bg-white shadow-lg'
                                                                    }`}
                                                            >
                                                                <ul className="py-1 bg-[#FF9102]">
                                                                    {subSubItems.map((subSubItem) => (
                                                                        <li key={subSubItem} className="px-3 py-1.5 hover:bg-[#FF8500]">
                                                                            <Link
                                                                                href={`/${item.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}/${subSubItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                                                onClick={closeAll}
                                                                                className="block w-full text-xs"
                                                                            >
                                                                                {subSubItem}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Search Bar - Right Side */}
                {/* <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex items-center w-full md:w-auto mt-4 md:mt-0 md:ml-auto md:px-6 flex-shrink-0`}>
                    <div className="relative w-full md:w-48">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-3 py-1.5 text-sm border border-[#FF9102] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9102]"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div> */}
            </nav>


        </div>
    );
};

export default Navbar;