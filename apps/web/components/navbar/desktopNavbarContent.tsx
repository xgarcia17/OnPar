"use client";

import { MINI_BUTTON_CLASSNAME, links } from "./navbar.constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DesktopNavbarContent() {
  const pathname = usePathname();
  return (
    <div className="sm:flex items-center gap-[clamp(0.5rem,2vw,1.5rem)] text-sm">
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
      <div>User Placeholder</div>
    </div>
  );
}
