import {
  BookOpenIcon,
  DumbbellIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Workouts", href: "/workouts", icon: BookOpenIcon },
  { label: "Exercises", href: "/exercises", icon: DumbbellIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function Navigation() {
  return (
    <>
      <div className="h-16 lg:hidden" />
      <nav className="bg-sidebar text-sidebar-foreground border-background fixed inset-x-0 bottom-0 lg:inset-x-auto lg:inset-y-0 lg:w-[300px] lg:py-10">
        <div className="mx-auto grid h-16 max-w-lg">
          <ul className="grid grid-cols-4 lg:flex lg:flex-col lg:gap-4">
            {navItems.map((navItem) => (
              <li key={navItem.label} className="grid">
                <Link
                  href={navItem.href}
                  className="hover:text-accent grid place-items-center justify-start transition-colors duration-300"
                >
                  <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:px-4 lg:py-2">
                    <navItem.icon size={20} />
                    <span>{navItem.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
