"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Star,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  PhoneCall,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getStoredVendors, VendorItem } from "@/data/vendor-store";

interface VendorDetailsPageProps {
  vendorId?: string;
}

export function VendorDetailsPage({ vendorId }: VendorDetailsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get("id");
  const activeId = vendorId || idFromQuery;

  const vendors = getStoredVendors();
  // Find vendor by ID or default to Jewelry Boutique (ven-6) to match CommerceO
  const vendor =
    (activeId ? vendors.find((v) => v.id === activeId) : null) ||
    vendors.find((v) => v.id === "ven-6") ||
    vendors[0];

  // Selected year for Sales Analytics
  const [selectedYear, setSelectedYear] = useState<"2024" | "2025">("2025");

  // Message modal state
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    toast.success(`Message dispatched to ${vendor.name}`);
    setMessageText("");
    setIsMessageOpen(false);
  };

  const handleGenerateReport = () => {
    toast.success(`Generated sales & compliance report for ${vendor.name}`);
  };

  const handleSuspendVendor = () => {
    toast.error(`Vendor ${vendor.name} has been suspended from catalog`);
  };

  // Mock bar heights for monthly chart
  const monthlyData = [
    { month: "Jan", val: 45 },
    { month: "Feb", val: 65 },
    { month: "Mar", val: 52 },
    { month: "Apr", val: 80 },
    { month: "May", val: 95 },
    { month: "Jun", val: 72 },
    { month: "Jul", val: 110 },
    { month: "Aug", val: 88 },
    { month: "Sep", val: 98 },
    { month: "Oct", val: 125 },
    { month: "Nov", val: 105 },
    { month: "Dec", val: 135 },
  ];

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
        <Link
          href="/vendors"
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Vendor
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Vendor Details
        </span>
      </nav>

      {/* Top back action */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/vendors")}
          className="rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          Back to Vendor List
        </Button>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold"
          >
            <Link href={`/vendors/add-vendor?edit=${vendor.id}`}>Edit Vendor</Link>
          </Button>
        </div>
      </div>

      {/* 2. Vendor Profile Hero Card */}
      <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200/80 dark:border-white/10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="size-16 sm:size-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/10 shrink-0 border border-gray-200/80 dark:border-white/10 shadow-xs">
              <Image
                src={vendor.logo || "/images/avatars/1.webp"}
                alt={vendor.name}
                width={80}
                height={80}
                priority
                className="size-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {vendor.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {vendor.status}
                </span>
                {vendor.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Sparkles className="size-3" />
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{vendor.email}</span>
                <span>•</span>
                <div className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>{vendor.rating.toFixed(1)} out of 5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <Button
              onClick={() => setIsMessageOpen(true)}
              className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="size-3.5 mr-1.5" />
              Send Message
            </Button>
          </div>
        </div>

        {/* 4 Mini KPI Stat Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="rounded-xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/5 p-4 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Package className="size-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white block">
                {vendor.productsCount}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Products
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/5 p-4 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShoppingCart className="size-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white block">
                {vendor.ordersCount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Orders
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/5 p-4 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <DollarSign className="size-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white block">
                ${vendor.revenue.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Revenue
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/5 p-4 flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white block">
                {vendor.satisfaction || "98%"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: About, Recent Products, Sales Analytics */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: About */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              About
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {vendor.about ||
                "The MacBook Pro is a high-performance laptop with Apple's M1 Pro/Max chips, offering excellent displays (Retina, ProMotion), long battery life, Magic Keyboard, large trackpad, and multiple ports (Thunderbolt, MagSafe). It's ideal for professionals needing power and portability, with sizes from 13\" to 16\"."}
            </p>
          </div>

          {/* Card: Recent Products */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Products
              </h2>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 cursor-pointer"
              >
                <Link href="/products">
                  View All
                  <ChevronRight className="size-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="divide-y divide-gray-200/80 dark:divide-white/10">
              {vendor.recentProducts && vendor.recentProducts.length > 0 ? (
                vendor.recentProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="py-3.5 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 flex items-center justify-center shrink-0 text-gray-500">
                        <Package className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {prod.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-gray-900 dark:text-white block">
                        ${prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through block">
                          ${prod.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-gray-400">
                  No recent products listed yet.
                </div>
              )}
            </div>
          </div>

          {/* Card: Sales Analytics */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Sales Analytics
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Revenue performance across the last 12 months.
                </p>
              </div>

              {/* Year Selector Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedYear("2024")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedYear === "2024"
                      ? "bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white shadow-2xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  2024
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedYear("2025")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedYear === "2025"
                      ? "bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white shadow-2xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  2025
                </button>
              </div>
            </div>

            {/* Quick KPI stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 p-3 bg-gray-50/50 dark:bg-white/[0.02]">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Last year
                </span>
                <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5 block">
                  $12,426
                </span>
              </div>
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 p-3 bg-gray-50/50 dark:bg-white/[0.02]">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  This Month
                </span>
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  $8,567
                </span>
              </div>
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 p-3 bg-gray-50/50 dark:bg-white/[0.02]">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Last Month
                </span>
                <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5 block">
                  234
                </span>
              </div>
              <div className="rounded-xl border border-gray-200/70 dark:border-white/10 p-3 bg-gray-50/50 dark:bg-white/[0.02]">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  New Orders
                </span>
                <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                  12
                </span>
              </div>
            </div>

            {/* Interactive Bar Chart Representation */}
            <div className="pt-2">
              <div className="h-44 flex items-end gap-2 sm:gap-4 justify-between border-b border-gray-200/80 dark:border-white/10 pb-2">
                {monthlyData.map((d, i) => (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                  >
                    <div
                      style={{ height: `${(d.val / 140) * 100}%` }}
                      className="w-full max-w-[28px] rounded-t-lg bg-indigo-500/20 group-hover:bg-indigo-600 dark:bg-indigo-500/30 dark:group-hover:bg-indigo-500 transition-colors"
                      title={`${d.month}: $${d.val}k`}
                    />
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact, Store Info, Categories, Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Contact Information */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <User className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-900 dark:text-white font-semibold block">
                    {vendor.contactPerson || "Lorine Hischke"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Contact Person
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-900 dark:text-white font-semibold block">
                    {vendor.phone}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Phone Number
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-900 dark:text-white font-semibold block">
                    {vendor.email}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Email Address
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-900 dark:text-white font-semibold block">
                    {vendor.company}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Company Name
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-900 dark:text-white font-semibold block">
                    {vendor.address}, {vendor.city} {vendor.country}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Address
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Store Information */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Store Information
            </h2>

            <div className="space-y-3 divide-y divide-gray-200/60 dark:divide-white/5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pt-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Store Status
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Open
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-500 dark:text-gray-400">
                  Member Since
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {vendor.memberSince || "Jan 2023"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-500 dark:text-gray-400">
                  Last Active
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {vendor.lastActive || "2 hours ago"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-500 dark:text-gray-400">
                  Verification
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-500 dark:text-gray-400">
                  Featured
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {vendor.isFeatured ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Card: Categories */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Categories
            </h2>

            <div className="flex flex-wrap gap-2 pt-1">
              {(vendor.categories && vendor.categories.length > 0
                ? vendor.categories
                : ["Latest", "Verified", "Creative Tools", "Computing Devices", "Premium"]
              ).map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200/70 dark:border-white/10"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Card: Quick Actions */}
          <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>

            <div className="space-y-2 pt-1">
              <Button
                variant="outline"
                onClick={() => setIsMessageOpen(true)}
                className="w-full justify-start h-9 rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
              >
                <MessageSquare className="size-3.5 mr-2 text-indigo-600" />
                Send Message
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start h-9 rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
              >
                <a href={`tel:${vendor.phone}`}>
                  <PhoneCall className="size-3.5 mr-2 text-emerald-600" />
                  Call Vendor
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full justify-start h-9 rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
              >
                <a href={`mailto:${vendor.email}`}>
                  <Mail className="size-3.5 mr-2 text-sky-600" />
                  Send Email
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleGenerateReport}
                className="w-full justify-start h-9 rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
              >
                <FileText className="size-3.5 mr-2 text-amber-600" />
                Generate Report
              </Button>

              <Button
                variant="outline"
                onClick={handleSuspendVendor}
                className="w-full justify-start h-9 rounded-xl border-rose-200/80 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold cursor-pointer"
              >
                <AlertTriangle className="size-3.5 mr-2" />
                Suspend Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Send Message Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Send Message to {vendor.name}</DialogTitle>
            <DialogDescription>
              Direct communication dispatched to {vendor.email}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendMessage} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Message</Label>
              <Textarea
                rows={4}
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your note, inquiry, or update..."
                className="rounded-xl border-gray-200/80 dark:border-white/10 text-sm resize-none"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMessageOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
