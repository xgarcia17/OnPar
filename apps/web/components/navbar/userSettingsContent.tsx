import Link from "next/link";
import { MINI_BUTTON_CLASSNAME } from "./navbar.constants";


export default function UserSettingsContent() {
  const username = "Jane Doe";
  return (
    <div className="flex flex-col items-center gap-2 text-sm">
      
      <h2 className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 font-medium text-lg text-navbar-active">{username}</h2>

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
