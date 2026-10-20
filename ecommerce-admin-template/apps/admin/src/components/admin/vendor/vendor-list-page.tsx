"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Store,
  DollarSign,
  Truck,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { VendorItem, getStoredVendors } from "@/data/vendor-store";
import { VendorDataGrid } from "./vendor-datagrid";

export function VendorListPage() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);

  const loadVendors = () => {
    setVendors(getStoredVendors());
  };

  useEffect(() => {
    loadVendors();
    window.addEventListener("vendors:updated", loadVendors);
    return () => window.removeEventListener("vendors:updated", loadVendors);
  }, []);

  // Compute stat numbers dynamically or fallback to reference defaults
  const totalVendorsCount = vendors.length > 0 ? vendors.length : 250;
  const activeVendorsCount = vendors.filter((v) => v.status === "Active").length;
  const avgRevenueFormatted = "$75k";
  const onDeliveryCount = 45;
  const satisfactionScore = "89%";

  return (
    <div className="flex flex-1 flex-col space-y-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/"
          className="hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1 transition-colors"
          title="Home"
        >
          <Home className="size-3.5" />
        </Link>
        <span>/</span>
        <span className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Vendor
        </span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Vendor List
        </span>
      </nav>

      {/* 2. Top Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Vendors */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white block">
              {totalVendorsCount}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">
              Total Vendors
            </span>
          </div>
          <div className="size-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/30">
            <Store className="size-5" />
          </div>
        </div>

        {/* Card 2: Average Revenue */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white block">
              {avgRevenueFormatted}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">
              Average Revenue
            </span>
          </div>
          <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/30">
            <DollarSign className="size-5" />
          </div>
        </div>

        {/* Card 3: On Delivery */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white block">
              {onDeliveryCount}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">
              On Delivery
            </span>
          </div>
          <div className="size-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/30">
            <Truck className="size-5" />
          </div>
        </div>

        {/* Card 4: Vendor Satisfaction */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white block">
              {satisfactionScore}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">
              Vendor Satisfaction
            </span>
          </div>
          <div className="size-11 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-100 dark:border-rose-900/30">
            <HeartHandshake className="size-5" />
          </div>
        </div>
      </div>

      {/* 3. Reusable Vendor Datagrid */}
      <VendorDataGrid vendors={vendors} onRefresh={loadVendors} />
    </div>
  );
}
