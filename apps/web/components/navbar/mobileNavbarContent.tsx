"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MINI_BUTTON_CLASSNAME, links } from "./navbar.constants";

export default function MobileNavbarContent({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // delay closing of pop-up menu until page reload
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setOpen(false);
      previousPathname.current = pathname;
    }
  }, [pathname, setOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`text-3xl hover:scale-110 transition ${
          open ? "text-navbar-inactive" : "text-navbar-active"
        }`}
      >
        ☰
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full bg-secondary px-[clamp(1rem,5vw,4rem)] pb-4 flex flex-col items-center gap-2 text-sm">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (isActive) setOpen(false);
                }}
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
      )}
    </>
  );
}
