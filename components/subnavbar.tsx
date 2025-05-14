import Link from "next/link";

export default function SubNavbar() {
    return (
        <nav className="text-white bg-[#FF9102] shadow-lg flex flex-col md:flex-row justify-between items-center px-4 md:px-10 font-semibold sticky top-0 z-3 h-auto md:h-12 gap-2">
            <div className="flex flex-col md:flex-row gap-2 ml-50">
                <Link href="/write-for-us" className="text-white hover:text-[#003366] px-3 py-1.5">WRITE FOR US</Link>
                <Link href="/advertise-with-us" className="text-white hover:text-[#003366] px-3 py-1.5">ADVERTISE WITH US</Link>
                <Link href="/partner-with-us" className="text-white hover:text-[#003366] px-3 py-1.5">PARTNER WITH US</Link>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mr-20">
                <Link href="/contact-us" className="text-white hover:text-[#003366] px-3 py-1.5">CONTACT US</Link>
                <Link href="/subscription" className="text-white hover:text-[#003366] px-3 py-1.5">SUBSCRIPTION</Link>
                <Link href="/sign-up" className="text-white hover:text-[#003366] px-3 py-1.5">SIGN IN / SIGN UP</Link>
                <Link href="/dashboard" className="text-white hover:text-[#003366] px-3 py-1.5">DASHBOARD</Link>
            </div>
        </nav>
    )
}