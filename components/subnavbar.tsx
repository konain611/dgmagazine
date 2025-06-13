'use client';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function SubNavbar() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await logout();
      router.push('/');
    }
  };


  return (
    <nav
      className="
        sticky
        bg-[#FF9102] text-white
        shadow-lg
        flex flex-wrap justify-center items-center
        gap-4 py-2
        z-10
      "
    >
      {token && (
        <Link href="/dashboard" className="px-3 py-1 hover:text-[#003366] font-semibold">
          DASHBOARD
        </Link>
      )}

      <Link href="/write-for-us" className="px-3 py-1 hover:text-[#003366]">
        WRITE FOR US
      </Link>
      <Link href="/advertise-with-us" className="px-3 py-1 hover:text-[#003366]">
        ADVERTISE WITH US
      </Link>
      <Link href="/partner-with-us" className="px-3 py-1 hover:text-[#003366]">
        PARTNER WITH US
      </Link>
      <Link href="/contact-us" className="px-3 py-1 hover:text-[#003366]">
        CONTACT US
      </Link>
      <Link href="/subscription" className="px-3 py-1 hover:text-[#003366]">
        SUBSCRIPTION
      </Link>

      {token ? (
        <button
          onClick={handleLogout}
          className="px-3 py-1 hover:text-red-600 font-semibold cursor-pointer border-2 border-white rounded-lg hover:border-red-600 transition-colors duration-300"
          title="Log out"
        >
          LOG OUT
        </button>
      ) : (
        <Link href="/sign-up" className="px-3 py-1 hover:text-[#003366]">
          SIGN IN / SIGN UP
        </Link>
      )}

    </nav>
  );
}
