import React from "react";
import Link from "next/link";

const sunscreenItems = [
  "https://images-static.nykaa.com/uploads/cba3534d-32b7-4596-80e0-df8393308087.jpg?tr=w-150,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/c1f46c79-70c2-4961-b743-8f7323135081.jpg?tr=w-150,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/d9b1ab62-a6b3-4f93-bdcd-8692baa4fdb0.jpg?tr=w-150,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/c7bebc0f-872d-4e09-892f-16231e693def.jpg?tr=w-150,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/cba3534d-32b7-4596-80e0-df8393308087.jpg?tr=w-150,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/c2792382-0715-490f-94a5-0777efe5ac1d.jpg?tr=w-150,cm-pad_resize"
];

export default function SaveOnSunscreens() {
  return (
    <section className="w-full px-3 sm:px-6 my-8" aria-label="Save On Sunscreens">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text mb-6 text-left">
        Solar Protection &amp; Sun Care
      </h2>

      {/* Main Feature Banner */}
      <div className="relative overflow-hidden rounded-[14px] shadow-card mb-5 group border border-mb-border">
        <Link href="/category/skincare" className="block">
          <img
            src="https://images-static.nykaa.com/uploads/10e573c1-d743-4b35-992b-88e73ec56603.jpg?tr=w-1200,cm-pad_resize"
            alt="Save On Sunscreens"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-4 left-4 bg-mb-primary/95 text-mb-bg px-5 py-3 rounded-[10px] shadow-card border border-mb-primary-hover">
            <p className="font-serif text-lg sm:text-xl font-bold leading-tight text-mb-bg">Up To 30% Off</p>
            <p className="text-xs text-mb-gold font-medium mt-0.5 uppercase tracking-wider">On SPF Essentials</p>
          </div>
        </Link>
      </div>

      {/* 6 item Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-5">
        {sunscreenItems.map((src, i) => (
          <Link
            key={i}
            href="/category/skincare"
            className="group flex flex-col items-center justify-center p-3 bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown transition-all"
          >
            <img
              src={src}
              alt="Sunscreen Product"
              className="w-full h-auto object-contain rounded-[8px] transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>

      {/* Secondary Bottom Banner */}
      <div className="overflow-hidden rounded-[14px] shadow-card border border-mb-border">
        <Link href="/category/skincare" className="block">
          <img
            src="https://images-static.nykaa.com/uploads/edd0a1a7-018e-461e-9455-dd72bd5a07c2.jpg?tr=w-1200,cm-pad_resize"
            alt="Sunscreens Promotion"
            className="w-full h-auto object-cover"
          />
        </Link>
      </div>
    </section>
  );
}
