"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const banner = document.getElementById("banner");
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav
      className={`sticky flex items-center justify-between px-4 py-4 top-0 z-50 w-full transition-colors duration-300 ${
        isHome
          ? scrolled
            ? "bg-white shadow-md text-black"
            : "bg-[#244eeb] text-white"
          : "bg-white shadow-md text-black"
      }`}
    >
      <div className="">Navbar</div>
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
