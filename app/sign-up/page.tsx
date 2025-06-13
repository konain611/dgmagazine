'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import HomeLayout2 from "@/components/homeLayout2";
import LoginRegister from "@/components/loginRegister";
import PopularPosts from "@/components/secondColumn";

function SignUpContent() {
  const searchParams = useSearchParams();
  const expired = searchParams?.get('sessionExpired');

  return (
    <div className="bg-gray-100 border-t-10 border-gray-100 min-h-screen">
      {expired === '1' && (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-amber-600 animate-[bounce_1.5s_infinite]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">
              Session expired, Login again.
            </p>
          </div>
        </div>
      )}
      <HomeLayout2
        left={<LoginRegister />}
        right={<PopularPosts />}
      />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
