"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Home,
  UploadCloud,
  Check,
  X,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addVendor, getVendorById, updateVendor } from "@/data/vendor-store";

const availableCategories = [
  "Food & Beverages",
  "Grocery",
  "Healthy Food",
  "Organic",
  "Electronics",
  "Fashion & Apparel",
  "Jewelry & Accessories",
  "Home & Garden",
];

const countriesList = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Switzerland",
  "Singapore",
];

export function VendorCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  // Load existing vendor if editing
  const existingVendor = editId ? getVendorById(editId) : null;

  // Form State
  const [name, setName] = useState(existingVendor?.name || "");
  const [phone, setPhone] = useState(existingVendor?.phone || "");
  const [email, setEmail] = useState(existingVendor?.email || "");
  const [company, setCompany] = useState(existingVendor?.company || "");
  const [address, setAddress] = useState(existingVendor?.address || "");
  const [city, setCity] = useState(existingVendor?.city || "");
  const [country, setCountry] = useState(existingVendor?.country || "USA");
  const [postalCode, setPostalCode] = useState(existingVendor?.postalCode || "");
  const [about, setAbout] = useState(
    existingVendor?.about ||
      "Leading supplier of premium quality goods with trusted worldwide distribution, verified certifications, and guaranteed return policies."
  );

  // Store Information State
  const [status, setStatus] = useState<"Active" | "Pending" | "Inactive">(
    existingVendor?.status || "Active"
  );
  const [rating, setRating] = useState<string>(
    existingVendor ? String(existingVendor.rating) : "4.5"
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    existingVendor?.isFeatured ?? true
  );
  const [isVerified, setIsVerified] = useState<boolean>(
    existingVendor?.isVerified ?? true
  );

  // Categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    existingVendor?.categories || ["Food & Beverages", "Organic"]
  );

  // Logo upload preview
  const [logoPreview, setLogoPreview] = useState<string>(
    existingVendor?.logo || "/images/avatars/1.webp"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
          toast.success("Logo uploaded successfully");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a vendor name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    const vendorPayload = {
      name: name.trim(),
      company: company.trim() || name.trim(),
      category: selectedCategories[0] || "General Goods",
      email: email.trim(),
      phone: phone.trim() || "+1 (555) 000-0000",
      contactPerson: name.trim().split(" ")[0] || "Vendor Manager",
      address: address.trim() || "100 Commerce Way",
      city: city.trim() || "New York",
      country: country || "USA",
      postalCode: postalCode.trim() || "10001",
      productsCount: existingVendor?.productsCount || 24,
      rating: parseFloat(rating) || 4.5,
      status,
      revenue: existingVendor?.revenue || 12500,
      ordersCount: existingVendor?.ordersCount || 180,
      satisfaction: "95%",
      isVerified,
      isFeatured,
      memberSince: existingVendor?.memberSince || "Today",
      lastActive: "Just now",
      logo: logoPreview,
      about: about.trim(),
      categories: selectedCategories.length > 0 ? selectedCategories : ["General Goods"],
      recentProducts: existingVendor?.recentProducts || [],
    };

    setTimeout(() => {
      if (editId) {
        updateVendor(editId, vendorPayload);
        toast.success(`Vendor "${name}" updated successfully`);
      } else {
        addVendor(vendorPayload);
        toast.success(`Vendor "${name}" created successfully`);
      }
      setIsSubmitting(false);
      router.push("/vendors");
    }, 400);
  };

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
          {editId ? "Edit Vendor" : "Create Vendor"}
        </span>
      </nav>

      {/* Header title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {editId ? "Edit Vendor Details" : "Create Vendor"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register a supplier or partner store into your marketplace catalog.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/vendors")}
          className="rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="size-3.5 mr-1.5" />
          Back to List
        </Button>
      </div>

      {/* Main Form Form Grid */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Basic Information */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Core contact and identification details for the vendor.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="v-name" className="text-xs font-semibold">
                    Name *
                  </Label>
                  <Input
                    id="v-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. TechMart Electronics"
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="v-phone" className="text-xs font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="v-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="v-email" className="text-xs font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="v-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@techmart.com"
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="v-company" className="text-xs font-semibold">
                    Company
                  </Label>
                  <Input
                    id="v-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="TechMart Global Inc."
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label htmlFor="v-address" className="text-xs font-semibold">
                  Address
                </Label>
                <Input
                  id="v-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="128 Silicon Way, Suite 400"
                  className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="v-city" className="text-xs font-semibold">
                    City
                  </Label>
                  <Input
                    id="v-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesList.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="v-zip" className="text-xs font-semibold">
                    Postal Code
                  </Label>
                  <Input
                    id="v-zip"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <Label htmlFor="v-about" className="text-xs font-semibold">
                  About
                </Label>
                <Textarea
                  id="v-about"
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Describe the vendor's catalog, sourcing origin, and warranty terms..."
                  className="rounded-xl border-gray-200/80 dark:border-white/10 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Logo, Store Info & Categories */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Vendor Logo Card */}
            <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Vendor Logo
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Store brand mark or profile badge.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {logoPreview ? (
                  <div className="flex flex-col items-center">
                    <div className="size-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xs mb-3">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        width={80}
                        height={80}
                        className="size-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      Click to change image
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Max 2MB · Images only
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="size-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                      <UploadCloud className="size-6" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      Drag &amp; drop or click to upload
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Max 2MB · Images only
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Store Information Card */}
            <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Store Information
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Marketplace status, rating, and promotional badge tier.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Store Status</Label>
                  <Select
                    value={status}
                    onValueChange={(v) =>
                      setStatus(v as "Active" | "Pending" | "Inactive")
                    }
                  >
                    <SelectTrigger className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Store Rating</Label>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200/80 dark:border-white/10 text-sm">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5.0">5.0 Stars (Perfect)</SelectItem>
                      <SelectItem value="4.8">4.8 Stars (Excellent)</SelectItem>
                      <SelectItem value="4.5">4.5 Stars (Very Good)</SelectItem>
                      <SelectItem value="4.0">4.0 Stars (Good)</SelectItem>
                      <SelectItem value="3.5">3.5 Stars (Average)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Toggles */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200/70 dark:border-white/10 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="size-4 text-amber-500" />
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          Featured Vendor
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          Highlight in top marketplace feeds
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="size-4 rounded accent-indigo-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200/70 dark:border-white/10 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-emerald-500" />
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          Verified Vendor
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          Show official verified partner badge
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onChange={(e) => setIsVerified(e.target.checked)}
                      className="size-4 rounded accent-indigo-600"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Categories Card */}
            <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Categories
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Select all product categories this vendor supplies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {availableCategories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? "border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-950 dark:text-indigo-200 font-semibold"
                          : "border-gray-200/70 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 font-medium"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="size-4 rounded accent-indigo-600"
                      />
                      <span>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action Buttons Footer */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-4 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/vendors")}
            className="h-10 px-5 rounded-xl border-gray-200/80 dark:border-white/10 text-xs sm:text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Check className="size-4 mr-1.5" />
            {isSubmitting
              ? "Saving..."
              : editId
              ? "✓ Update Vendor"
              : "✓ Create Vendor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
