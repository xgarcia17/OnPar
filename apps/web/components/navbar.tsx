"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



const MINI_BUTTON_CLASSNAME =
  "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-gray-700 font-medium hover:bg-gray-100 hover:shadow-lg transition cursor-pointer";

export default function NavBar() {
  const pathname: string = usePathname();
  return (
    <nav className="bg-secondary border-bg-secondary flex-shrink-0">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap md:flex-nowrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {/* Main Button */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:scale-110 transition mr-auto">
          <Link href="/" aria-label="Home" className="flex items-center gap-3">
            <span className="text-3xl font-bold text-navbar">OnPar</span>
          </Link>
        </div>
        {/* Navigation Buttons */}
        <div className="flex gap-6 text-sm mx-auto">
        </div>
      </div>
    </nav>
  );
}
