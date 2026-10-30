import React from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────────────── */
const LINKS = [
  {
    title: "Top Categories",
    items: ["Makeup", "Skincare", "Hair", "Bath & Body", "Appliances", "Mom & Baby", "Health & Wellness", "Men", "Fragrance"],
  },
  {
    title: "Company",
    items: ["About Us", "Careers", "Press", "Investors", "Sustainability", "Moryelle Blog"],
  },
  {
    title: "Support",
    items: ["Track Order", "Returns & Refunds", "Shipping Policy", "Contact Us", "FAQs", "Store Locator"],
  },
  {
    title: "Account",
    items: ["Sign In", "Create Account", "Order History", "Wishlist", "Moryelle Wallet"],
  },
  {
    title: "MORYELLE Stores",
    items: ["Moryelle Luxe", "Moryelle Fashion", "Moryelle Man", "Moryelle Pro", "Moryelle Global"],
  },
];

const SOCIALS = [
  { label: "Facebook",  abbr: "Fb" },
  { label: "Instagram", abbr: "In" },
  { label: "Twitter",   abbr: "Tw" },
  { label: "YouTube",   abbr: "Yt" },
  { label: "Pinterest", abbr: "Pi" },
];

/* ── Component ────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#CDD3D8]" role="contentinfo">

      {/* ── App + Social strip ──────────────────────────────── */}
      <div className="bg-[#F4F4F4] border-b border-[#CDD3D8]">
        <div className="mx-auto max-w-content px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#000000]">
              Get Extra 20% Off on Your First App Order
            </p>
            <p className="text-xs text-[#595E63] mt-0.5">Download the MORYELLE app today</p>
          </div>
          <div className="flex gap-2">
            <a
              href="#"
              className="inline-block bg-[#000000] text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
              aria-label="Get MORYELLE on Google Play"
            >
              Google Play
            </a>
            <a
              href="#"
              className="inline-block bg-[#000000] text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
              aria-label="Download MORYELLE on App Store"
            >
              App Store
            </a>
          </div>
          <nav aria-label="Social media links" className="flex gap-2">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#CDD3D8] bg-white text-xs font-semibold text-[#595E63] hover:bg-[#E80071] hover:text-white hover:border-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]"
              >
                {s.abbr}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Links grid ──────────────────────────────────────── */}
      <div className="mx-auto max-w-content px-4 md:px-6 py-8">
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {LINKS.map(section => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-[#000000] uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2" role="list">
                  {section.items.map(item => (
                    <li key={item} role="listitem">
                      <Link
                        href="#"
                        className="text-xs text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-[#CDD3D8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#000000] font-medium">
              Customer Care: 1800-267-4444
            </p>
            <p className="text-[10px] text-[#6F7981] mt-0.5">All days, 8 AM to 10 PM</p>
          </div>
          <nav className="flex gap-4" aria-label="Legal links">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map(l => (
              <a
                key={l}
                href="#"
                className="text-xs text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded"
              >
                {l}
              </a>
            ))}
          </nav>
          <p className="text-[10px] text-[#6F7981]">© 2026 MORYELLE. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
