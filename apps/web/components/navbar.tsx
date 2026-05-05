"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MINI_BUTTON_CLASSNAME =
  "flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 font-medium hover:scale-110 transition cursor-pointer";

const links = [
  { href: "/tournaments", label: "Your Tournaments" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/test0", label: "Test0" },
  { href: "/test1", label: "Test1" },
  { href: "/test2", label: "Test2" },
  { href: "/test3", label: "Test3" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-secondary flex-shrink-0">
      <div className="w-full px-[clamp(1rem,5vw,4rem)] py-3 flex items-center justify-between">
        {/* Title */}
        <Link href="/" aria-label="Home">
          <span className="block text-3xl font-bold text-navbar-active mr-[20px] leading-[0.85] hover:scale-110 transition">
            OnPar
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-[clamp(0.5rem,2vw,1.5rem)] text-sm">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? `${MINI_BUTTON_CLASSNAME} text-navbar-active`
                    : `${MINI_BUTTON_CLASSNAME} text-navbar-inactive`
                }
              >
                {link.label}
              </Link>
            );
          })}
          {/* User Portal Button */}
          <div>User Placeholder</div>
        </div>

        {/* Hamburger button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`md:hidden text-3xl transition ${
            open ? "text-navbar-inactive" : "text-navbar-active"
          }`}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-[clamp(1rem,5vw,4rem)] pb-4 flex flex-col items-center gap-2 text-sm">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  isActive
                    ? `${MINI_BUTTON_CLASSNAME} text-navbar-active`
                    : `${MINI_BUTTON_CLASSNAME} text-navbar-inactive`
                }
              >
                {link.label}
              </Link>
            );
          })}
          {/* User Portal Button */}
          <div>User Placeholder</div>
        </div>
      )}
    </nav>
  );
}
