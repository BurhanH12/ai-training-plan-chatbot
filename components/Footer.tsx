import Link from "next/link";
import { siteContent } from "@/content/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8F6F1] px-6 py-8 text-sm text-[#5A6A8A]">
      <p className="max-w-md">{siteContent.brand.tagline}</p>
      <nav className="mt-4 flex flex-wrap gap-4">
        {siteContent.footerNav.map((link) => (
          <Link
            key={link.label}
            href={
              link.href === "/" || link.href === "/features/"
                ? link.href.replace(/\/$/, "") || "/"
                : "#"
            }
            className="hover:text-[#010F31]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-6">&copy; 2026 {siteContent.brand.name}</p>
    </footer>
  );
}
