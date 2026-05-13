"use state";

import Link from "next/link";
import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";
import { getUserById } from "../../lib/api/users";
import { useEffect, useState } from "react";
import { User } from "@onpar/shared";

export default function UserSettingsContent() {
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

  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      <h2 className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 font-medium text-lg text-navbar-active">
        {isLoading ? "Loading..." : error ? "User unavailable" : user?.name}
      </h2>

      <Link
        href="/settings"
        className={`${MINI_BUTTON_CLASSNAME} text-navbar-inactive`}
      >
        User Settings
      </Link>

      <button
        type="button"
        className={`${MINI_BUTTON_CLASSNAME} text-navbar-inactive`}
      >
        Sign Out
      </button>
    </div>
  );
}
