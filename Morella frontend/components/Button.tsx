import React, { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  href?: string;
  className?: string;
}

const BASE =
  "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071] disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<string, string> = {
  primary:   "bg-[#E80071] text-white hover:opacity-90",
  secondary: "bg-[#F4F4F4] text-[#000000] border border-[#CDD3D8] hover:bg-[#CDD3D8]",
  outline:   "border border-[#E80071] text-[#E80071] hover:bg-[#E80071] hover:text-white",
  ghost:     "text-[#595E63] hover:bg-[#F4F4F4]",
};

const SIZES: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} disabled={loading || props.disabled} {...props}>
      {loading && (
        <>
          <svg
            className="mr-2 h-3.5 w-3.5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="sr-only">Loading…</span>
        </>
      )}
      {children}
    </button>
  );
}
