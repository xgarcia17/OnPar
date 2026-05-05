"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MINI_BUTTON_CLASSNAME =
  "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-gray-700 font-medium hover:scale-110 transition cursor-pointer";

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

  return (
    <nav className="bg-secondary border-bg-secondary flex-shrink-0">
      <div className="w-full px-3 md:px-6 py-3 flex flex-wrap md:flex-nowrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {/* Main Button */}
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center mr-auto ml-[clamp(0.75rem,5vw,4rem)]"
        >
          <span className="block text-3xl font-bold text-navbar-active leading-[0.85] translate-y-[-2px] hover:scale-110 transition">
            OnPar
          </span>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex gap-6 text-sm ml-auto mr-[clamp(0.75rem,5vw,4rem)] max-w-7xl">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
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
        </div>
      </div>
    </nav>
  );
}
