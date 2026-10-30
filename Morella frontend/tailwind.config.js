/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SKILL.md palette
        nk: {
          white:   "#ffffff",
          bg:      "#f4f4f4",
          accent:  "#e80071",
          text:    "#000000",
          muted:   "#595e63",
          dim:     "#6f7981",
          border:  "#cdd3d8",
          lite:    "#e8e8e8",
          blue:    "#e0f7ff",
          pink:    "#fde8f0",
          green:   "#388e3c",
          sale:    "#fff3cd",
        },
      },
      fontFamily: {
        sans: ["Inter", "Source Sans Pro", "system-ui", "sans-serif"],
      },
      fontSize: {
        "9":  ["9px",  { lineHeight: "12px" }],
        "10": ["10px", { lineHeight: "14px" }],
        "11": ["11px", { lineHeight: "14px" }],
        "12": ["12px", { lineHeight: "16px" }],
        "13": ["13px", { lineHeight: "18px" }],
        "14": ["14px", { lineHeight: "20px" }],
        "16": ["16px", { lineHeight: "22px" }],
        "18": ["18px", { lineHeight: "24px" }],
        "20": ["20px", { lineHeight: "26px" }],
      },
      spacing: {
        "0.5": "2px",
        "1":   "4px",
        "1.5": "6px",
        "2":   "8px",
        "2.5": "10px",
        "3":   "12px",
        "3.5": "14px",
        "4":   "16px",
        "5":   "20px",
        "6":   "24px",
        "7":   "28px",
        "8":   "32px",
        "9":   "36px",
        "10":  "40px",
        "12":  "48px",
        "16":  "64px",
      },
      borderRadius: {
        none: "0",
        sm:   "2px",
        DEFAULT: "4px",
        md:   "8px",
        lg:   "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "rgba(0,0,0,0.1) 0px 1px 10px 0px",
        md: "rgba(0,0,0,0.15) 0px 2px 16px 0px",
      },
      maxWidth: {
        content: "1280px",
        site:    "1440px",
      },
      screens: {
        sm:  "640px",
        md:  "768px",
        lg:  "1024px",
        xl:  "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
