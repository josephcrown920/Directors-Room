"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/layers", label: "Layers" },
  { href: "/generate/image", label: "Image" },
  { href: "/generate/video", label: "Video" },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-lg text-white">
          Directors Room
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  active
                    ? "bg-white text-ink"
                    : "text-muted hover:text-white hover:bg-panel"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
