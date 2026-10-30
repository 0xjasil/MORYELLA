"""One-shot rebrand: crop logos + remap color classes. Safe to re-run."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"f:\Moreylla\Morella frontend")
PUBLIC = ROOT / "public" / "brand"
PUBLIC.mkdir(parents=True, exist_ok=True)

# ── Logo crop from attached brand sheet ─────────────────────────
SHEET_CANDIDATES = [
    Path(r"C:\Users\jasil\.cursor\projects\f-Moreylla-Morella-frontend\assets\c__Users_jasil_AppData_Roaming_Cursor_User_workspaceStorage_9370a7793bfa78db7c3d118aab986431_images_WhatsApp_Image_2026-10-30_at_1.22.00_PM-2b358490-57b6-4229-935f-da76264e97c9.jpg"),
    ROOT / "brand-sheet.jpg",
]


def crop_logos() -> None:
    try:
        from PIL import Image
    except ImportError:
        import subprocess, sys
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "-q"])
        from PIL import Image

    src = next((p for p in SHEET_CANDIDATES if p.exists()), None)
    if src is None:
        print("BRAND SHEET NOT FOUND")
        return
    im = Image.open(src).convert("RGB")
    w, h = im.size
    print(f"Brand sheet {w}x{h} from {src}")

    def box(l, t, r, b):
        return (int(l * w), int(t * h), int(r * w), int(b * h))

    # Layout of the brand sheet (left hero / right grid / bottom variants)
    crops = {
        "logo-primary.png": box(0.02, 0.04, 0.48, 0.72),
        "logo-secondary.png": box(0.67, 0.05, 0.82, 0.30),
        "logo-emblem.png": box(0.84, 0.05, 0.985, 0.30),
        "logo-gold.png": box(0.125, 0.755, 0.248, 0.985),
        "logo-on-dark.png": box(0.002, 0.755, 0.122, 0.985),
    }
    for name, b in crops.items():
        crops[name]  # keep type happy
        part = im.crop(b)
        part.save(PUBLIC / name, "PNG")
        print(f"  saved {name} {part.size}")

    # Favicon-sized emblem
    emblem = Image.open(PUBLIC / "logo-emblem.png")
    emblem.resize((64, 64), Image.Resampling.LANCZOS).save(PUBLIC / "favicon-64.png")


# Longest-first so hover:/group-hover: prefixes are not partially eaten.
REPLACEMENTS: list[tuple[str, str]] = [
    ("text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-purple-600", "font-serif font-semibold text-mb-text"),
    ("bg-gradient-to-r from-red-500 via-pink-600 to-purple-600", "font-serif text-mb-text"),

    ("group-hover:text-[#E80071]", "group-hover:text-mb-accent-deep"),
    ("group-hover:text-[#e80071]", "group-hover:text-mb-accent-deep"),
    ("hover:text-[#E80071]", "hover:text-mb-accent-deep"),
    ("hover:text-[#e80071]", "hover:text-mb-accent-deep"),
    ("hover:border-[#E80071]/40", "hover:border-mb-accent"),
    ("hover:border-[#e80071]/30", "hover:border-mb-accent"),
    ("hover:border-[#E80071]", "hover:border-mb-accent"),
    ("hover:border-[#e80071]", "hover:border-mb-accent"),
    ("hover:bg-[#d60068]", "hover:bg-mb-primary-hover"),
    ("hover:bg-[#D60068]", "hover:bg-mb-primary-hover"),
    ("focus-visible:ring-[#E80071]", "focus-visible:ring-mb-accent"),
    ("focus-visible:ring-[#e80071]", "focus-visible:ring-mb-accent"),
    ("focus:ring-[#E80071]", "focus:ring-mb-accent"),
    ("focus:ring-[#e80071]", "focus:ring-mb-accent"),
    ("focus:border-[#E80071]", "focus:border-mb-accent"),
    ("focus:border-[#e80071]", "focus:border-mb-accent"),
    ("focus-within:border-[#E80071]", "focus-within:border-mb-accent"),
    ("ring-[#E80071]", "ring-mb-accent"),
    ("ring-[#e80071]", "ring-mb-accent"),
    ("border-[#E80071]", "border-mb-primary"),
    ("border-[#e80071]", "border-mb-primary"),
    ("bg-[#E80071]", "bg-mb-primary"),
    ("bg-[#e80071]", "bg-mb-primary"),
    ("text-[#E80071]", "text-mb-accent-deep"),
    ("text-[#e80071]", "text-mb-accent-deep"),
    ("fill-[#e80071]", "fill-mb-accent"),
    ("fill-[#E80071]", "fill-mb-accent"),

    ("bg-[#F4F4F4]", "bg-mb-surface"),
    ("bg-[#f3f3f3]", "bg-mb-bg"),
    ("bg-[#F3F3F3]", "bg-mb-bg"),
    ("bg-[#fff2e3]", "bg-mb-surface"),
    ("bg-[#FFF2E3]", "bg-mb-surface"),
    ("bg-[#fff3cd]", "bg-mb-surface"),
    ("bg-[#FFF3CD]", "bg-mb-surface"),
    ("bg-[#FDE8F0]", "bg-mb-surface"),
    ("bg-[#FFF0F5]", "bg-mb-surface"),
    ("bg-[#E0F7FF]", "bg-mb-surface"),
    ("bg-[#000000]", "bg-mb-primary"),

    ("text-[#000000]", "text-mb-text"),
    ("hover:text-[#000]", "hover:text-mb-text"),
    ("text-[#595E63]", "text-mb-body"),
    ("text-[#595e63]", "text-mb-body"),
    ("text-[#6F7981]", "text-mb-muted"),
    ("text-[#6f7981]", "text-mb-muted"),
    ("placeholder-[#999]", "placeholder-mb-placeholder"),
    ("text-[#999]", "text-mb-placeholder"),
    ("text-[#666]", "text-mb-muted"),
    ("text-[#AAAAAA]", "text-mb-muted"),

    ("border-[#E8E8E8]", "border-mb-border"),
    ("border-[#e8e8e8]", "border-mb-border"),
    ("border-[#CDD3D8]", "border-mb-border"),
    ("border-[#cdd3d8]", "border-mb-border"),
    ("border-[#F4F4F4]", "border-mb-border-lite"),

    ("bg-black/60", "bg-mb-primary/80"),
    ("bg-black/50", "bg-mb-text/50"),
    ("backdrop-blur-sm", ""),

    ("hover:bg-nk-accent", "hover:bg-mb-primary"),
    ("bg-nk-accent", "bg-mb-primary"),
    ("text-nk-accent", "text-mb-accent-deep"),
    ("border-nk-accent", "border-mb-primary"),
    ("ring-nk-accent", "ring-mb-accent"),
    ("hover:border-nk-accent", "hover:border-mb-accent"),
    ("hover:text-nk-accent", "hover:text-mb-accent-deep"),
    ("text-nk-text", "text-mb-text"),
    ("text-nk-muted", "text-mb-muted"),
    ("text-nk-dim", "text-mb-muted"),
    ("border-nk-border", "border-mb-border"),
    ("border-nk-lite", "border-mb-border-lite"),
    ("bg-nk-bg", "bg-mb-surface"),
    ("bg-nk-pink", "bg-mb-surface"),
    ("bg-nk-white", "bg-mb-bg"),
    ("text-nk-green", "text-mb-success"),
    ("bg-nk-green", "bg-mb-success"),

    ("hover:bg-white", "hover:bg-mb-bg"),
    ("bg-white/90", "bg-mb-bg/90"),
    ("bg-white/80", "bg-mb-bg/80"),
    ("bg-white", "bg-mb-surface"),
    ("hover:text-white", "hover:text-mb-bg"),
    ("text-white/90", "text-mb-bg/90"),
    ("text-white/40", "text-mb-bg/50"),
    ("ring-white", "ring-mb-bg"),
    ("text-white", "text-mb-bg"),
    ("text-black", "text-mb-text"),

    ("hover:bg-gray-50", "hover:bg-mb-surface"),
    ("hover:bg-gray-100", "hover:bg-mb-surface"),
    ("bg-gray-50", "bg-mb-surface"),
    ("bg-gray-100", "bg-mb-surface"),
    ("border-gray-100", "border-mb-border"),
    ("border-gray-200", "border-mb-border"),
    ("border-amber-100", "border-mb-border"),
    ("text-gray-900", "text-mb-text"),
    ("text-gray-800", "text-mb-text"),
    ("text-gray-700", "text-mb-body"),
    ("text-gray-600", "text-mb-body"),
    ("text-gray-500", "text-mb-muted"),
    ("text-gray-400", "text-mb-placeholder"),
    ("text-gray-200", "text-mb-gold"),
    ("bg-pink-100", "bg-mb-gold"),
    ("bg-teal-700", "bg-mb-gold-deep"),
    ("text-emerald-600", "text-mb-success"),
    ("from-red-500", "from-mb-gold"),
    ("via-pink-600", "via-mb-dusty"),
    ("to-purple-600", "to-mb-accent"),
]


STYLE_SWAPS = [
    ('backgroundColor: "#388e3c"', 'backgroundColor: "var(--color-gold-deep)"'),
    ('backgroundColor: "#fff3cd"', 'backgroundColor: "var(--color-surface)"'),
    ('fill={filled ? "#e80071" : "none"}', 'fill={filled ? "currentColor" : "none"}'),
    ('stroke={filled ? "#e80071" : "#aaa"}', 'stroke="currentColor"'),
    ('background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"',
     'background: "linear-gradient(to top, color-mix(in srgb, var(--color-primary) 72%, transparent), transparent)"'),
]


def remap_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    for old, new in STYLE_SWAPS:
        text = text.replace(old, new)
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    crop_logos()
    changed = []
    for folder in (ROOT / "components", ROOT / "pages"):
        for path in folder.rglob("*"):
            if path.suffix.lower() in {".tsx", ".ts", ".jsx", ".js"}:
                if remap_file(path):
                    changed.append(str(path.relative_to(ROOT)))
    print(f"Updated {len(changed)} files")
    for c in changed:
        print(" ", c)


if __name__ == "__main__":
    main()
