"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MINI_BUTTON_CLASSNAME, links } from "./navbar.constants";
import UserSettingsContent from "./userSettingsContent";
import { User } from "@onpar/shared";
import { getUserById } from "@/lib/api/users";

export default function MobileNavbarContent({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [mobileView, setMobileView] = useState<"links" | "settings">("links");

  const userId = 402;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

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
        onClick={() => {
          setOpen(!open);
          if (open) {
            setMobileView("links");
          }
        }}
        className={`text-3xl hover:scale-110 transition ${
          open ? "text-navbar-inactive" : "text-navbar-active"
        }`}
      >
        ☰
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full bg-secondary px-[clamp(1rem,5vw,4rem)] pb-4 flex flex-col items-center gap-2 text-sm">
          {mobileView === "links" ? (
            <>
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

              <button
                type="button"
                onClick={() => setMobileView("settings")}
                className={`${MINI_BUTTON_CLASSNAME} text-navbar-inactive`}
              >
                {isLoading
                  ? "Loading..."
                  : error
                    ? "User unavailable"
                    : user?.name}
              </button>
            </>
          ) : (
            <UserSettingsContent />
          )}
        </div>
      )}
    </>
  );
}
