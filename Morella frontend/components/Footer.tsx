import React from "react";
import Link from "next/link";

const footerSections = [
  {
    title: "Top Categories",
    links: ["Makeup", "Skin", "Hair", "Bath & Body", "Appliances", "Mom and Baby", "Health & Wellness", "Men", "Fragrance"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Investors", "Sustainability", "Moryelle Blog"],
  },
  {
    title: "Support",
    links: ["Track Order", "Returns", "Shipping", "Contact Us", "FAQs", "Store Locator"],
  },
  {
    title: "Account",
    links: ["Sign In", "Create Account", "Order History", "Wishlist", "Moryelle Wallet"],
  },
  {
    title: "Moryelle Stores",
    links: ["Moryelle Luxe", "Moryelle Fashion", "Moryelle Man", "Moryelle Pro", "Moryelle Global Store"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-[var(--space-8)] bg-[var(--color-bg)]">
      {/* App download & social */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-white)]">
        <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
          <div className="flex flex-col items-center justify-between gap-[var(--space-6)] md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-[var(--space-2)]">
                MORYELLE - The Online Beauty Store
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-[var(--space-4)]">
                Exclusive Offers On App! Get Extra 20% off On Your First App Order
              </p>
              <div className="flex gap-[var(--space-3)]">
                <button className="rounded-[var(--radius-md)] bg-[var(--color-text-primary)] px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium text-white">
                  Get it on Google Play
                </button>
                <button className="rounded-[var(--radius-md)] bg-[var(--color-text-primary)] px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium text-white">
                  Download on App Store
                </button>
              </div>
            </div>
            <div className="flex gap-[var(--space-4)]">
              {["Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-12)]">
        <div className="grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-3 md:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="mb-[var(--space-4)] text-base font-semibold text-[var(--color-text-primary)]"
                style={{ lineHeight: "var(--leading-base)" }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-[var(--space-2)]">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Customer support */}
        <div className="mt-[var(--space-10)] border-t border-[var(--color-border)] pt-[var(--space-6)]">
          <div className="flex flex-col items-center justify-between gap-[var(--space-4)] sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                For any help, you may call us at 1800-267-4444
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                (All days, 8 AM to 10 PM)
              </p>
            </div>
            <div className="flex gap-[var(--space-4)]">
              <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                Sitemap
              </a>
            </div>
          </div>
          <p className="mt-[var(--space-4)] text-center text-sm text-[var(--color-text-secondary)]">
            © 2026 MORYELLE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}