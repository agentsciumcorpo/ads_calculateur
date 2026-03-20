"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Vue Client" },
    { href: "/expert", label: "Vue Expert" },
  ];

  return (
    <nav className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            pathname === link.href
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
