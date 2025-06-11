'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  User,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  CreditCard,
  Repeat,
  Mail
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Profile', icon: <User size={18} /> },
  { href: '/dashboard/edit-profile', label: 'Edit Information', icon: <User size={18} /> },
  { section: 'Activity' },
  { href: '/dashboard/activity/likes', label: 'Liked Articles', icon: <ThumbsUp size={18} /> },
  { href: '/dashboard/activity/dislikes', label: 'Disliked Articles', icon: <ThumbsDown size={18} /> },
  { href: '/dashboard/activity/comments', label: 'Comments', icon: <MessageSquare size={18} /> },
  { section: 'Settings' },
  { href: '/dashboard/payment-history', label: 'Payment History', icon: <CreditCard size={18} /> },
  { href: '/dashboard/subscription-history', label: 'Subscription', icon: <Repeat size={18} /> },
  { href: '/dashboard/email-updates', label: 'Email Updates', icon: <Mail size={18} /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] text-[#003366]">
      <aside className="w-64 bg-white border-r border-[#003366]/20 px-6 py-8 hidden md:block shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#003366]">Your Dashboard</h2>

        <nav className="space-y-1 text-sm">
          {navItems.map((item, idx) =>
            item.section ? (
              <p
                key={idx}
                className="uppercase text-xs text-[#003366]/50 mt-4 mb-1 tracking-wider font-semibold"
              >
                {item.section}
              </p>
            ) : (
              <Link
                key={item.href}
                href={item.href as string}
                className={`flex items-center gap-2 px-3 py-2 my-1 rounded-md transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-[#FF9102]/20 text-[#FF9102] font-semibold'
                    : 'text-[#003366]/80 hover:bg-[#003366]/5 hover:text-[#003366]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
