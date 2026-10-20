"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { VendorItem, deleteVendor as removeVendorFromStore } from "@/data/vendor-store";

interface VendorDataGridProps {
  vendors: VendorItem[];
  onRefresh?: () => void;
  title?: string;
  showCreateButton?: boolean;
}

export function VendorDataGrid({
  vendors,
  onRefresh,
  title = "All Vendors",
  showCreateButton = true,
}: VendorDataGridProps) {
  const router = useRouter();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Delete modal state
  const [vendorToDelete, setVendorToDelete] = useState<VendorItem | null>(null);

  // Filtered dataset
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        vendor.name.toLowerCase().includes(q) ||
        vendor.category.toLowerCase().includes(q) ||
        vendor.email.toLowerCase().includes(q) ||
        vendor.city.toLowerCase().includes(q) ||
        vendor.country.toLowerCase().includes(q);

      // Status
      const matchesStatus =
        statusFilter === "ALL" ||
        vendor.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [vendors, searchQuery, statusFilter]);

  // Pagination calculation
  const totalEntries = filteredVendors.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedVendors = filteredVendors.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(paginatedVendors.map((v) => v.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredVendors.length === 0) {
      toast.error("No vendor data to export");
      return;
    }

    const headers = [
      "ID",
      "Vendor Name",
      "Category",
      "Email",
      "Phone",
      "Location",
      "Products",
      "Rating",
      "Status",
      "Revenue",
    ];

    const rows = filteredVendors.map((v) => [
      `"${v.id}"`,
      `"${v.name}"`,
      `"${v.category}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.city}, ${v.country}"`,
      v.productsCount,
      v.rating,
      `"${v.status}"`,
      v.revenue,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vendors_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredVendors.length} vendors to CSV`);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!vendorToDelete) return;
    removeVendorFromStore(vendorToDelete.id);
    toast.success(`Vendor "${vendorToDelete.name}" deleted successfully`);
    setVendorToDelete(null);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs overflow-hidden">
      {/* 1. Header Toolbar */}
      <div className="p-4 sm:p-6 border-b border-gray-200/80 dark:border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your network of trusted vendors and suppliers
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 pl-9 pr-3 rounded-xl border-gray-200/80 dark:border-white/10 text-xs sm:text-sm bg-gray-50/50 dark:bg-white/5"
            />
          </div>

          {/* Rows per page */}
          <select
            value={rowsPerPage}
            aria-label="Rows per page"
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-9 px-3 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            aria-label="Filter vendors by status"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 rounded-xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-9 px-3.5 rounded-xl border-gray-200/80 dark:border-white/10 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
          >
            <Download className="size-3.5 mr-1.5" />
            Export
          </Button>

          {/* Add Vendor Button */}
          {showCreateButton && (
            <Button
              asChild
              className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Link href="/vendors/add-vendor">
                <Plus className="size-4 mr-1.5" />
                Add Vendor
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* 2. Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/80 dark:bg-white/[0.02] border-b border-gray-200/80 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-5 py-3.5 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all vendors on this page"
                  checked={
                    paginatedVendors.length > 0 &&
                    paginatedVendors.every((v) => selectedIds.has(v.id))
                  }
                  onChange={handleSelectAll}
                  className="size-4 rounded accent-indigo-600 cursor-pointer"
                />
              </th>
              <th scope="col" className="px-5 py-3.5">
                Vendor
              </th>
              <th scope="col" className="px-5 py-3.5">
                Contact
              </th>
              <th scope="col" className="px-5 py-3.5">
                Location
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Products
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Rating
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Status
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200/80 dark:divide-white/10">
            {paginatedVendors.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 text-sm"
                >
                  No vendors found matching your filter criteria.
                </td>
              </tr>
            ) : (
              paginatedVendors.map((vendor) => {
                const isSelected = selectedIds.has(vendor.id);
                return (
                  <tr
                    key={vendor.id}
                    className={`hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors ${
                      isSelected ? "bg-indigo-50/40 dark:bg-indigo-950/20" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        aria-label={`Select vendor ${vendor.name}`}
                        checked={isSelected}
                        onChange={() => handleSelectRow(vendor.id)}
                        className="size-4 rounded accent-indigo-600 cursor-pointer"
                      />
                    </td>

                    {/* Vendor Name & Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 border border-gray-200/60 dark:border-white/10">
                          {vendor.logo ? (
                            <Image
                              src={vendor.logo}
                              alt={vendor.name}
                              width={36}
                              height={36}
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                              {vendor.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/vendors/${vendor.id}`}
                            className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block text-sm"
                          >
                            {vendor.name}
                          </Link>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            {vendor.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm">
                        <span className="text-gray-900 dark:text-white block font-medium">
                          {vendor.email}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          {vendor.phone}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-gray-400 shrink-0" />
                        <span>
                          {vendor.city}, {vendor.country}
                        </span>
                      </div>
                    </td>

                    {/* Products Count */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <span className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                        {vendor.productsCount}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1 font-semibold text-xs sm:text-sm text-amber-500">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span>{vendor.rating.toFixed(1)}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      {vendor.status === "Active" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      ) : vendor.status === "Pending" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                          >
                            <MoreVertical className="size-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl">
                          <DropdownMenuItem
                            onClick={() => router.push(`/vendors/${vendor.id}`)}
                            className="cursor-pointer text-xs"
                          >
                            <Eye className="size-3.5 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/vendors/add-vendor?edit=${vendor.id}`)}
                            className="cursor-pointer text-xs"
                          >
                            <Edit2 className="size-3.5 mr-2" />
                            Edit Vendor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setVendorToDelete(vendor)}
                            className="cursor-pointer text-xs text-rose-600 focus:text-rose-600"
                          >
                            <Trash2 className="size-3.5 mr-2" />
                            Delete Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination Footer */}
      <div className="p-4 sm:p-5 border-t border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div>
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalEntries === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(startIndex + rowsPerPage, totalEntries)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalEntries}
          </span>{" "}
          entries
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-8 px-2.5 rounded-lg border-gray-200/80 dark:border-white/10 text-xs font-medium cursor-pointer"
          >
            <ChevronLeft className="size-3.5 mr-1" />
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className={`size-8 p-0 rounded-lg text-xs font-semibold cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-8 px-2.5 rounded-lg border-gray-200/80 dark:border-white/10 text-xs font-medium cursor-pointer"
          >
            Next
            <ChevronRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={!!vendorToDelete}
        onOpenChange={(open) => !open && setVendorToDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Delete Vendor
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 dark:text-white">
                {vendorToDelete?.name}
              </strong>
              ? This action will remove all associated products and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 pt-2">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
            >
              Delete Vendor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
