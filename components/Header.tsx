"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import WaitlistModal from "./WaitlistModal";

export default function Header() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-6 py-4">
      <Link href="/" className="text-lg font-bold text-[#010F31]">
        {siteContent.brand.name}
      </Link>
      <nav className="hidden gap-5 md:flex">
        {siteContent.nav.map((link) => (
          <Link
            key={link.label}
            href={
              link.href === "/" || link.href === "/features/"
                ? link.href.replace(/\/$/, "") || "/"
                : "#"
            }
            className="text-sm text-[#5A6A8A] hover:text-[#010F31]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => setWaitlistOpen(true)}
        className="rounded bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white"
      >
        Join Waitlist
      </button>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </header>
  );
}
