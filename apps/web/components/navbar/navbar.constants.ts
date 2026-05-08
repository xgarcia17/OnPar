interface NavLink {
  href: string;
  label: string;
}

export const MINI_BUTTON_CLASSNAME: string =
  "flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 font-medium hover:scale-110 transition cursor-pointer";

export const links: NavLink[] = [
  { href: "/tournaments", label: "Your Tournaments" },
  { href: "/leaderboard", label: "Leaderboard" },
];
