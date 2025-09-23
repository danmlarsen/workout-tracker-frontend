import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'History', href: '/history' },
  { label: 'Train', href: '/train' },
  { label: 'Stats', href: '/stats' },
];

export default function MobileNav() {
  return (
    <>
      <div className="h-20" />
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black grid text-white">
        <ul className="grid grid-cols-4">
          {navItems.map(navItem => (
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
