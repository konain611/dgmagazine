'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-48">
      {/* Bold Spinner */}
      <div className="relative w-20 h-20">
        <div className="w-full h-full border-[6px] border-[#003366]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-[6px] border-transparent border-t-[#FF9102] rounded-full animate-spin-slow"></div>
      </div>
      
      {/* Loading Text */}
      <p className="text-[#003366] font-semibold text-lg animate-pulse">Loading your data...</p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}