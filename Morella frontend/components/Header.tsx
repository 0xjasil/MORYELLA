/**
 * Header — exact Nykaa 3-tier structure from Playwright MCP snapshots:
 * Tier 1: announcement bar + [Get App, Store & Events, Gift Card, Help]
 * Tier 2: logo | primary nav [Categories, Brands, Luxe, Fashion, Beauty Advice] | search | [Sign in, Bag]
 * Tier 3: category nav [makeup, skin, hair, appliances, Bath & Body, Natural, mom & baby, Health & Wellness, men, fragrance, Fashion Selects, Offers]
 */
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/components/ProductGrid";

/* ── Data — exact Nykaa labels from snapshots ─────────────────── */
const TOP_LINKS = [
  { label: "Get App",         href: "#" },
  { label: "Store & Events",  href: "#" },
  { label: "Gift Card",       href: "#" },
  { label: "Help",            href: "#" },
];

const PRIMARY_NAV = [
  { label: "Categories",    href: "#" },
  { label: "Brands",        href: "#" },
  { label: "Luxe",          href: "/category/luxe" },
  { label: "MORYELLE Fashion", href: "/category/fashion" },
  { label: "Beauty Advice", href: "#" },
];

// Exact order from Nykaa Secondary nav snapshot
const CATEGORY_NAV = [
  { label: "makeup",              href: "/category/makeup" },
  { label: "skin",                href: "/category/skincare" },
  { label: "hair",                href: "/category/hair" },
  { label: "appliances",          href: "/category/appliances" },
  { label: "Bath & Body",         href: "/category/bath-body" },
  { label: "Natural",             href: "/category/natural" },
  { label: "mom & baby",          href: "/category/mom-baby" },
  { label: "Health & Wellness",   href: "/category/health-wellness" },
  { label: "men",                 href: "/category/men" },
  { label: "fragrance",           href: "/category/fragrance" },
  { label: "Fashion Selects",     href: "/category/fashion" },
  { label: "Offers",              href: "/category/offers", accent: true },
];

/* ── SVG icons ────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/* ── Component ────────────────────────────────────────────────── */
export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Search results
  const searchResults = React.useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    if (!q) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchVal]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setSearchFocused(false);
    router.push(`/category/all?q=${encodeURIComponent(searchVal.trim())}`);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLoginOpen(false);
        setMenuOpen(false);
        setSearchFocused(false);
        setActiveMenu(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", h);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", h);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loginOpen) return;
    modalRef.current?.querySelector<HTMLElement>("input")?.focus();
  }, [loginOpen]);

  return (
    <>
      {/* Skip link */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-[#E80071] focus:text-white focus:px-3 focus:py-1.5 focus:rounded focus:text-xs focus:font-semibold">
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 bg-white shadow-sm" role="banner">

        {/* ══ TIER 1: Announcement + top utility links ═════════ */}
        <div className="bg-[#E80071] text-white">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-8 flex items-center justify-between">
            {/* Announcement — clickable like Nykaa "BEAUTY BONANZA" */}
            <Link href="#"
              className="text-[11px] font-semibold tracking-wide truncate hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white">
              Get Extra 20% Off on First App Order! Use Code: MORYELLE20
            </Link>

            {/* Utility list — [Get App, Store & Events, Gift Card, Help] */}
            <ul className="hidden md:flex items-center" role="list">
              {TOP_LINKS.map(link => (
                <li key={link.label} role="listitem">
                  <a href={link.href}
                    className="flex items-center gap-1 px-3 text-[11px] font-medium hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══ TIER 2: Logo | Primary nav | Search | Actions ════ */}
        <div className="bg-white border-b border-[#E8E8E8]">
          <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-14 flex items-center gap-3">

            {/* Logo */}
            <Link href="/" aria-label="MORYELLE — homepage"
              className="flex-shrink-0 mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded">
              <span className="text-[20px] font-bold text-[#E80071] tracking-[0.15em] uppercase leading-none">
                MORYELLE
              </span>
            </Link>

            {/* Primary nav — [Categories, Brands, Luxe, Fashion, Beauty Advice] */}
            <nav ref={navContainerRef} className="hidden lg:flex items-center relative" aria-label="Primary navigation">
              <ul className="flex items-center" role="list">
                {PRIMARY_NAV.map(item => (
                  <li key={item.label} role="listitem" className="relative">
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-3 py-1 text-[13px] font-medium text-[#000000] hover:text-[#E80071] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                        onMouseEnter={() => setActiveMenu(item.label)}
                        className={`flex items-center gap-1 px-3 py-1 text-[13px] font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded ${
                          activeMenu === item.label ? "text-[#E80071]" : "text-[#000000] hover:text-[#E80071]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mega-menu / Dropdown for Categories */}
              {activeMenu === "Categories" && (
                <div
                  onMouseLeave={() => setActiveMenu(null)}
                  className="absolute top-full left-0 mt-2 w-[460px] bg-white rounded-md shadow-lg border border-[#CDD3D8] p-4 z-50 grid grid-cols-2 gap-4"
                >
                  <div>
                    <h3 className="text-xs font-bold text-[#E80071] uppercase tracking-wider mb-2">Popular Categories</h3>
                    <ul className="flex flex-col gap-1.5 text-xs text-[#000000]">
                      <li><Link href="/category/makeup" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Makeup (Lips, Eyes, Face)</Link></li>
                      <li><Link href="/category/skincare" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Skincare (Moisturizers, Serums)</Link></li>
                      <li><Link href="/category/hair" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Hair Care (Shampoos, Oils)</Link></li>
                      <li><Link href="/category/fragrance" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Fragrance &amp; Perfumes</Link></li>
                      <li><Link href="/category/bath-body" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Bath &amp; Body Wash</Link></li>
                      <li><Link href="/category/appliances" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Beauty Appliances</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#595E63] uppercase tracking-wider mb-2">Featured Highlights</h3>
                    <ul className="flex flex-col gap-1.5 text-xs text-[#000000]">
                      <li><Link href="/category/luxe" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">MORYELLE Luxe</Link></li>
                      <li><Link href="/category/gifting" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Gifting Studio</Link></li>
                      <li><Link href="/category/natural" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Natural &amp; Clean Beauty</Link></li>
                      <li><Link href="/category/health-wellness" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Health &amp; Wellness</Link></li>
                      <li><Link href="/category/offers" onClick={() => setActiveMenu(null)} className="text-[#E80071] font-semibold hover:underline">Special Offers &amp; Combos</Link></li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Mega-menu / Dropdown for Brands */}
              {activeMenu === "Brands" && (
                <div
                  onMouseLeave={() => setActiveMenu(null)}
                  className="absolute top-full left-12 mt-2 w-[340px] bg-white rounded-md shadow-lg border border-[#CDD3D8] p-4 z-50"
                >
                  <h3 className="text-xs font-bold text-[#E80071] uppercase tracking-wider mb-2">Top Brands</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#000000]">
                    <Link href="/category/loreal-paris" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">L&apos;Oréal Paris</Link>
                    <Link href="/category/maybelline" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Maybelline</Link>
                    <Link href="/category/lakme" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Lakmé</Link>
                    <Link href="/category/fenty-beauty" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Fenty Beauty</Link>
                    <Link href="/category/biotique" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Biotique</Link>
                    <Link href="/category/mamaearth" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">Mamaearth</Link>
                    <Link href="/category/pixi" onClick={() => setActiveMenu(null)} className="hover:text-[#E80071]">PIXI</Link>
                    <Link href="/category/moryelle" onClick={() => setActiveMenu(null)} className="font-semibold text-[#E80071]">MORYELLE Cosmetics</Link>
                  </div>
                </div>
              )}
            </nav>

            {/* Search — "Search on Nykaa" placeholder from snapshot */}
            <div ref={searchContainerRef} className="flex-1 hidden md:block relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-[#F4F4F4] border border-[#E8E8E8] rounded-sm h-9 focus-within:border-[#E80071] transition-colors"
              >
                <label htmlFor="header-search" className="sr-only">Search on MORYELLE</label>
                <input
                  id="header-search"
                  type="search"
                  name="q"
                  placeholder="Search on MORYELLE"
                  autoComplete="off"
                  spellCheck={false}
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="flex-1 min-w-0 bg-transparent pl-3 pr-1 text-[13px] text-[#000000] placeholder-[#999] outline-none"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="flex-shrink-0 px-3 h-full text-[#666] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]"
                >
                  <SearchIcon />
                </button>
              </form>

              {/* Live search suggestions dropdown */}
              {searchFocused && searchVal.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#CDD3D8] rounded-md shadow-xl z-50 overflow-hidden">
                  <div className="p-2 border-b border-[#F4F4F4] text-[11px] font-semibold text-[#595E63] uppercase">
                    Products matching &quot;{searchVal}&quot;
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto">
                      {searchResults.map(prod => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.id}`}
                          onClick={() => {
                            setSearchFocused(false);
                            setSearchVal("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-[#F4F4F4] transition-colors border-b border-[#F4F4F4] last:border-0"
                        >
                          <img
                            src={prod.image}
                            alt=""
                            width={36}
                            height={36}
                            className="w-9 h-9 object-contain bg-white rounded-sm p-0.5 border border-[#E8E8E8]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-[#595E63] font-semibold uppercase">{prod.brand}</p>
                            <p className="text-[12px] text-[#000000] truncate font-medium">{prod.name}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[12px] font-semibold text-[#000000]">₹{prod.price}</span>
                            {prod.discount && (
                              <span className="block text-[10px] text-[#E80071] font-medium">{prod.discount}% Off</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-[#595E63]">
                      No products found. Press Enter to view all results.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions: Sign in + Shopping Bag (exact labels from snapshot) */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">

              {/* Mobile search */}
              <button type="button" aria-label="Search"
                className="md:hidden p-2 text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded">
                <SearchIcon />
              </button>

              {/* Sign in button — exact label from snapshot */}
              <button type="button"
                onClick={() => setLoginOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#000000] hover:text-[#E80071] transition-colors border border-[#E8E8E8] rounded-sm hover:border-[#E80071] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]">
                Sign in
              </button>

              {/* Wishlist */}
              <Link href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative hidden md:flex p-2 text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span aria-hidden="true"
                    className="absolute top-0 right-0 w-4 h-4 bg-[#E80071] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag — exact label from snapshot */}
              <Link href="/cart"
                aria-label={`Shopping Bag, ${itemCount} items`}
                className="relative flex items-center gap-1.5 p-2 text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded">
                <BagIcon />
                <span aria-hidden="true"
                  className="absolute top-0 right-0 w-4 h-4 bg-[#E80071] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              </Link>

              {/* Mobile menu toggle */}
              <button type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen(v => !v)}
                className="lg:hidden p-2 text-[#595E63] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded">
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* ══ TIER 3: Category nav ══════════════════════════════ */}
        {/* navigation "Secondary" > navigation "Main navigation menu" from snapshot */}
        <nav aria-label="Main navigation menu"
          className="hidden lg:block bg-white border-b border-[#E8E8E8]">
          <div className="mx-auto max-w-[1280px] px-6">
            <ul className="flex items-center overflow-x-auto no-scrollbar" role="list">
              {CATEGORY_NAV.map(cat => (
                <li key={cat.label} role="listitem">
                  <Link href={cat.href}
                    className={`block px-3 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 border-transparent hover:border-[#E80071] hover:text-[#E80071] transition-colors capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] ${
                      cat.accent ? "text-[#E80071] font-semibold" : "text-[#000000]"
                    }`}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile navigation"
            className="lg:hidden bg-white border-t border-[#E8E8E8] shadow-md max-h-[80vh] overflow-y-auto">

            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("q") as HTMLInputElement;
                if (input && input.value.trim()) {
                  setMenuOpen(false);
                  router.push(`/category/all?q=${encodeURIComponent(input.value.trim())}`);
                }
              }}
              className="px-4 py-3 border-b border-[#F4F4F4]"
            >
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="flex items-center bg-[#F4F4F4] border border-[#E8E8E8] rounded-sm h-9 focus-within:border-[#E80071]">
                <input id="mobile-search" type="search" name="q" placeholder="Search on MORYELLE"
                  autoComplete="off"
                  className="flex-1 bg-transparent pl-3 text-[13px] outline-none" />
                <button type="submit" aria-label="Search" className="px-3 text-[#999] hover:text-[#E80071]"><SearchIcon /></button>
              </div>
            </form>

            <ul role="list">
              {CATEGORY_NAV.map(cat => (
                <li key={cat.label} role="listitem">
                  <Link href={cat.href} onClick={() => setMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-[13px] font-medium border-b border-[#F4F4F4] hover:bg-[#F4F4F4] capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071] ${
                      cat.accent ? "text-[#E80071]" : "text-[#000000]"
                    }`}>
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li role="listitem">
                <button type="button"
                  onClick={() => { setMenuOpen(false); setLoginOpen(true); }}
                  className="w-full text-left px-4 py-3 text-[13px] font-medium text-[#E80071] border-b border-[#F4F4F4] hover:bg-[#F4F4F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]">
                  Sign In / Register
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* ══ Login modal — matches Nykaa snapshot exactly ════════ */}
      {loginOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="login-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          onClick={e => { if (e.target === e.currentTarget) setLoginOpen(false); }}>
          <div ref={modalRef}
            className="relative bg-white w-full max-w-[360px] rounded-lg shadow-xl mx-4"
            style={{ overscrollBehavior: "contain" }}>

            {/* Close */}
            <button type="button" aria-label="Close"
              onClick={() => setLoginOpen(false)}
              className="absolute top-3 right-3 p-1 text-[#999] hover:text-[#000] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]">
              <CloseIcon />
            </button>

            <div className="px-6 py-5">
              {/* heading "Login or Signup" [level=1] — from snapshot */}
              <h1 id="login-title" className="text-[18px] font-semibold text-[#000000] mb-1">
                Login or Signup
              </h1>
              <p className="text-[13px] text-[#595E63] mb-5">
                Get started &amp; grab best offers!
              </p>

              {/* textbox "Mobile Number" — from snapshot */}
              <div className="mb-4">
                <label htmlFor="login-mobile" className="block text-[12px] font-medium text-[#000000] mb-1.5">
                  Mobile Number
                </label>
                <input id="login-mobile" type="tel" name="phone"
                  placeholder=""
                  autoComplete="tel"
                  spellCheck={false}
                  className="w-full border border-[#CDD3D8] rounded-sm px-3 py-2.5 text-[13px] text-[#000000] outline-none focus:border-[#E80071] focus:ring-1 focus:ring-[#E80071] transition-colors"
                />
              </div>

              {/* button "Send OTP" [disabled] — from snapshot */}
              <button type="button"
                className="w-full bg-[#E80071] text-white text-[13px] font-semibold py-2.5 rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]">
                Send OTP
              </button>

              {/* "Or sign in using" divider — from snapshot */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E8E8E8]" />
                <span className="text-[12px] text-[#999]">Or sign in using</span>
                <div className="h-px flex-1 bg-[#E8E8E8]" />
              </div>

              {/* button "Continue with Google" — from snapshot */}
              <button type="button"
                className="w-full border border-[#CDD3D8] text-[13px] font-medium text-[#000000] py-2.5 rounded-sm hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
