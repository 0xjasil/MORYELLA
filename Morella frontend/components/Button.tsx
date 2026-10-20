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

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<string, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:opacity-90 focus-visible:ring-[var(--color-accent)]",
  secondary:
    "bg-[var(--color-surface-warm)] text-[var(--color-text-primary)] hover:opacity-85 focus-visible:ring-[var(--color-accent)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus-visible:ring-[var(--color-accent)]",
  ghost:
    "text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] focus-visible:ring-[var(--color-accent)]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-[var(--space-6)] py-[var(--space-2)] text-sm rounded-[var(--radius-md)]",
  md: "px-[var(--space-8)] py-[var(--space-3)] text-base rounded-[var(--radius-lg)]",
  lg: "px-[var(--space-10)] py-[var(--space-4)] text-lg rounded-[var(--radius-xl)]",
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
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}