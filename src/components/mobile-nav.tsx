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

export default function MobileNav() {
  return (
    <>
      <div className="h-16" />
      <nav className="bg-sidebar text-sidebar-foreground border-background fixed inset-x-0 bottom-0">
        <div className="mx-auto grid h-16 max-w-lg">
          <ul className="grid grid-cols-4">
            {navItems.map((navItem) => {
              const Icon = navItem.icon;

              return (
                <li key={navItem.label} className="grid">
                  <Link href={navItem.href} className="grid place-items-center">
                    <div className="flex flex-col items-center">
                      <Icon size={20} />
                      <span>{navItem.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
