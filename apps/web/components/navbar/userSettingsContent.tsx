import Link from "next/link";
import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";

export default function UserSettingsContent() {
  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      <h4>User Name</h4>

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
