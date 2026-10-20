import React, { useState } from "react";
import Link from "next/link";

const topNav = ["Categories", "Brands", "Luxe", "Nykaa Fashion", "Beauty Advice"];
const mainCats = ["Makeup", "Skin", "Hair", "Appliances", "Bath & Body", "Natural", "Mom & Baby", "Health & Wellness", "Men", "Fragrance", "Fashion Selects"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[var(--color-bg-white)] border-b border-[var(--color-border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-[var(--space-6)] py-[var(--space-3)] text-sm">
          <span className="text-[var(--color-text-primary)] font-medium">
            HAVE YOU SHOPPED FROM OUR FESTIVE SALE YET?
          </span>
          <div className="flex items-center gap-[var(--space-4)]">
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">Get App</a>
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">Store &amp; Events</a>
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">Gift Card</a>
            <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">Help</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-[var(--space-6)] py-[var(--space-4)]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[var(--color-accent)] tracking-tight">nykaa</span>
          </Link>

          {/* Top nav links */}
          <nav className="hidden md:flex items-center gap-[var(--space-6)]">
            {topNav.map((item) => (
              <Link
                key={item}
                href="#"
                className="text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-[var(--space-4)]">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-[var(--space-2)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="hidden md:inline-flex items-center gap-[var(--space-2)] text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
            >
              Sign in
            </button>
            <button
              className="relative p-[var(--space-2)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l2.6 13.2a2 2 0 002 1.6h9.8a2 2 0 002-1.6L21 9M6 6L5.2 3H2" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs text-white">
                3
              </span>
            </button>
            <button
              className="md:hidden p-[var(--space-2)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Main category nav */}
        <div className="border-t border-[var(--color-border)]">
          <div className="mx-auto flex max-w-7xl items-center gap-[var(--space-6)] overflow-x-auto px-[var(--space-6)] py-[var(--space-3)]">
            {mainCats.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="whitespace-nowrap text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-white)]">
            <div className="mx-auto flex max-w-7xl items-center gap-[var(--space-4)] px-[var(--space-6)] py-[var(--space-4)]">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="flex-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] px-[var(--space-4)] py-[var(--space-3)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
              <button className="rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--space-6)] py-[var(--space-3)] text-base font-medium text-white hover:opacity-90">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-white)]">
            <nav className="flex flex-col px-[var(--space-6)] py-[var(--space-4)] gap-[var(--space-2)]">
              {mainCats.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-[var(--space-2)] text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Login modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-[var(--radius-xl)] bg-[var(--color-bg-white)] p-[var(--space-8)] shadow-[var(--shadow-xl)]">
            <div className="mb-[var(--space-6)] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Login or Signup</h2>
              <button onClick={() => setShowLogin(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-[var(--space-4)] text-sm text-[var(--color-text-secondary)]">
              Get started &amp; grab best offers!
            </p>
            <div className="mb-[var(--space-4)]">
              <label className="mb-[var(--space-2)] block text-sm font-medium text-[var(--color-text-primary)]">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] px-[var(--space-4)] py-[var(--space-3)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            <button className="w-full rounded-[var(--radius-lg)] bg-[var(--color-accent)] py-[var(--space-3)] text-base font-medium text-white hover:opacity-90">
              Send OTP
            </button>
            <div className="my-[var(--space-4)] flex items-center gap-[var(--space-4)]">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span className="text-sm text-[var(--color-text-secondary)]">Or sign in using</span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>
            <button className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] py-[var(--space-3)] text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">
              Sign in with Mobile Number
            </button>
          </div>
        </div>
      )}
    </>
  );
}