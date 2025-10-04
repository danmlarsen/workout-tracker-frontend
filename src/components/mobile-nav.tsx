import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Workouts", href: "/workouts" },
  { label: "Exercises", href: "/exercises" },
  { label: "Settings", href: "/settings" },
];

export default function MobileNav() {
  return (
    <>
      <div className="h-16" />
      <nav className="bg-foreground text-background border-background fixed inset-x-0 bottom-0 grid h-16">
        <ul className="grid grid-cols-4">
          {navItems.map((navItem) => (
            <li key={navItem.label} className="grid">
              <Link href={navItem.href} className="grid place-items-center">
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
