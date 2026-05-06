"use client";

import Link from "next/link";
import DesktopNavbarContent from "./desktopNavbarContent";
import MobileNavbarContent from "./mobileNavbarContent";

export default function NavBar() {
  return (
    <nav className="relative w-full bg-secondary flex-shrink-0">
      <div className="w-full px-[clamp(1rem,5vw,4rem)] py-3 flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <span className="block text-3xl font-bold text-navbar-active mr-[20px] leading-[0.85] hover:scale-110 transition">
            OnPar
          </span>
        </Link>

        <div className="hidden sm:flex">
          <DesktopNavbarContent />
        </div>
        <div className="sm:hidden">
          <MobileNavbarContent />
        </div>
      </div>
    </nav>
  );
}
