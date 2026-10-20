"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Users,
  Package,
  UserPlus,
  UserCheck,
  Search,
  Upload,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Download,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export interface CustomerItem {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials?: string;
  country: string;
  ordersCount: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Banned";
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  state?: string;
  postcode?: string;
  createdAt: string;
}

// Initial realistic customer list matching reference template
const INITIAL_CUSTOMERS: CustomerItem[] = [
  {
    id: "c-1",
    customerId: "#879861",
    name: "Stanfield Baser",
    email: "sbaser0@boston.com",
    phone: "+1 (555) 234-8901",
    avatar: "/images/avatars/1.webp",
    country: "Sri Lanka",
    ordersCount: 157,
    totalSpent: 2074.22,
    status: "Active",
    addressLine1: "42 Galle Face Green",
    town: "Colombo",
    state: "Western",
    postcode: "00100",
    createdAt: "2024-03-15",
  },
  {
    id: "c-2",
    customerId: "#178408",
    name: "Laurie Dax",
    email: "ldax1@lycos.com",
    phone: "+7 (912) 345-6789",
    initials: "LD",
    country: "Russia",
    ordersCount: 663,
    totalSpent: 2404.19,
    status: "Active",
    addressLine1: "15 Tverskaya St",
    town: "Moscow",
    state: "Central",
    postcode: "125009",
    createdAt: "2024-01-22",
  },
  {
    id: "c-3",
    customerId: "#221092",
    name: "Maxine Kenrick",
    email: "mkenrick2@eepurl.com",
    phone: "+502 2345-6789",
    avatar: "/images/avatars/2.webp",
    country: "Guatemala",
    ordersCount: 64,
    totalSpent: 8821.4,
    status: "Active",
    addressLine1: "8va Calle 3-40",
    town: "Guatemala City",
    state: "Guatemala",
    postcode: "01001",
    createdAt: "2024-04-10",
  },
  {
    id: "c-4",
    customerId: "#645579",
    name: "Harman Burkill",
    email: "hburkill3@drupal.org",
    phone: "+351 912 345 678",
    initials: "HB",
    country: "Portugal",
    ordersCount: 640,
    totalSpent: 5294.35,
    status: "Active",
    addressLine1: "Avenida da Liberdade 120",
    town: "Lisbon",
    state: "Lisbon",
    postcode: "1250-142",
    createdAt: "2023-11-18",
  },
  {
    id: "c-5",
    customerId: "#288765",
    name: "Aubrey Borrow",
    email: "aborrow4@jiathis.com",
    phone: "+33 6 12 34 56 78",
    avatar: "/images/avatars/3.webp",
    country: "France",
    ordersCount: 184,
    totalSpent: 1003.3,
    status: "Active",
    addressLine1: "24 Rue de Rivoli",
    town: "Paris",
    state: "Île-de-France",
    postcode: "75004",
    createdAt: "2024-02-05",
  },
  {
    id: "c-6",
    customerId: "#321942",
    name: "Nester Fridd",
    email: "nfridd5@cdbaby.com",
    phone: "+86 138 0013 8000",
    initials: "NF",
    country: "China",
    ordersCount: 965,
    totalSpent: 3876.92,
    status: "Active",
    addressLine1: "88 Nanjing East Rd",
    town: "Shanghai",
    state: "Shanghai",
    postcode: "200001",
    createdAt: "2023-09-12",
  },
  {
    id: "c-7",
    customerId: "#516109",
    name: "Lizzie Nicholes",
    email: "lnicholes6@rediff.com",
    phone: "+55 11 98765-4321",
    avatar: "/images/avatars/4.webp",
    country: "Brazil",
    ordersCount: 514,
    totalSpent: 7936.85,
    status: "Active",
    addressLine1: "Av. Paulista 1578",
    town: "São Paulo",
    state: "SP",
    postcode: "01310-200",
    createdAt: "2024-05-02",
  },
  {
    id: "c-8",
    customerId: "#403666",
    name: "Amabel Scullion",
    email: "ascullion7@wiley.com",
    phone: "+502 4567-8901",
    avatar: "/images/avatars/5.webp",
    country: "Guatemala",
    ordersCount: 584,
    totalSpent: 4150.97,
    status: "Active",
    addressLine1: "12 Avenida Las Americas",
    town: "Guatemala City",
    state: "Guatemala",
    postcode: "01014",
    createdAt: "2023-12-01",
  },
  {
    id: "c-9",
    customerId: "#895280",
    name: "Zeke Arton",
    email: "zarton8@weibo.com",
    phone: "+380 44 123 4567",
    avatar: "/images/avatars/6.webp",
    country: "Ukraine",
    ordersCount: 539,
    totalSpent: 3430.05,
    status: "Active",
    addressLine1: "Khreshchatyk St 22",
    town: "Kyiv",
    state: "Kyiv",
    postcode: "01001",
    createdAt: "2024-06-18",
  },
  {
    id: "c-10",
    customerId: "#199195",
    name: "Rosy Medlicott",
    email: "rmedlicott9@amazon.com",
    phone: "+7 (812) 987-6543",
    initials: "RM",
    country: "Russia",
    ordersCount: 4,
    totalSpent: 8646.75,
    status: "Active",
    addressLine1: "Nevsky Prospekt 48",
    town: "St. Petersburg",
    state: "Northwestern",
    postcode: "191186",
    createdAt: "2024-07-29",
  },
  {
    id: "u1",
    customerId: "#381029",
    name: "Sophia Carter",
    email: "sophia.carter@example.com",
    phone: "+1 555-0149",
    avatar: "/images/avatars/7.webp",
    country: "United States",
    ordersCount: 12,
    totalSpent: 1407.0,
    status: "Active",
    addressLine1: "742 Evergreen Terrace",
    town: "Springfield",
    state: "OR",
    postcode: "97477",
    createdAt: "2025-03-14",
  },
  {
    id: "u2",
    customerId: "#772194",
    name: "Marcus Vance",
    email: "marcus.v@example.com",
    phone: "+1 555-0182",
    avatar: "/images/avatars/8.webp",
    country: "United Kingdom",
    ordersCount: 48,
    totalSpent: 3180.5,
    status: "Active",
    addressLine1: "10 Downing Street",
    town: "London",
    state: "Greater London",
    postcode: "SW1A 2AA",
    createdAt: "2025-04-02",
  },
  {
    id: "u3",
    customerId: "#904123",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 555-0199",
    avatar: "/images/avatars/9.webp",
    country: "Germany",
    ordersCount: 85,
    totalSpent: 4920.0,
    status: "Active",
    addressLine1: "Unter den Linden 77",
    town: "Berlin",
    state: "Berlin",
    postcode: "10117",
    createdAt: "2025-04-18",
  },
  {
    id: "u4",
    customerId: "#551829",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+1 555-0231",
    avatar: "/images/avatars/10.webp",
    country: "Ireland",
    ordersCount: 32,
    totalSpent: 2150.0,
    status: "Active",
    addressLine1: "Grafton Street 45",
    town: "Dublin",
    state: "Leinster",
    postcode: "D02",
    createdAt: "2025-05-10",
  },
  {
    id: "u5",
    customerId: "#662910",
    name: "Aria Takahashi",
    email: "aria.t@example.com",
    phone: "+1 555-0275",
    avatar: "/images/avatars/11.webp",
    country: "Japan",
    ordersCount: 19,
    totalSpent: 1290.0,
    status: "Banned",
    addressLine1: "Ginza 4-Chome 6-16",
    town: "Tokyo",
    state: "Tokyo",
    postcode: "104-0061",
    createdAt: "2025-06-01",
  },
  {
    id: "c-11",
    customerId: "#418290",
    name: "Devon Lane",
    email: "devon.l@example.com",
    phone: "+1 (416) 555-0192",
    avatar: "/images/avatars/12.webp",
    country: "Canada",
    ordersCount: 104,
    totalSpent: 6840.0,
    status: "Active",
    addressLine1: "Bay Street 200",
    town: "Toronto",
    state: "ON",
    postcode: "M5J 2J2",
    createdAt: "2024-08-11",
  },
  {
    id: "c-12",
    customerId: "#883019",
    name: "Kristin Watson",
    email: "kristin.w@example.com",
    phone: "+61 2 9876 5432",
    avatar: "/images/avatars/13.webp",
    country: "Australia",
    ordersCount: 73,
    totalSpent: 4310.0,
    status: "Active",
    addressLine1: "George Street 300",
    town: "Sydney",
    state: "NSW",
    postcode: "2000",
    createdAt: "2024-09-05",
  },
  {
    id: "c-13",
    customerId: "#102938",
    name: "Cameron Williamson",
    email: "cameron.w@example.com",
    phone: "+31 20 123 4567",
    avatar: "/images/avatars/14.webp",
    country: "Netherlands",
    ordersCount: 210,
    totalSpent: 11450.0,
    status: "Active",
    addressLine1: "Keizersgracht 421",
    town: "Amsterdam",
    state: "North Holland",
    postcode: "1016 EK",
    createdAt: "2024-02-19",
  },
  {
    id: "c-14",
    customerId: "#774019",
    name: "Theresa Webb",
    email: "theresa.w@example.com",
    phone: "+34 91 123 4567",
    avatar: "/images/avatars/15.webp",
    country: "Spain",
    ordersCount: 38,
    totalSpent: 2980.0,
    status: "Active",
    addressLine1: "Gran Vía 28",
    town: "Madrid",
    state: "Madrid",
    postcode: "28013",
    createdAt: "2024-10-14",
  },
  {
    id: "c-15",
    customerId: "#392019",
    name: "Kathryn Murphy",
    email: "kathryn.m@example.com",
    phone: "+39 06 1234 5678",
    avatar: "/images/avatars/16.webp",
    country: "Italy",
    ordersCount: 145,
    totalSpent: 8120.0,
    status: "Active",
    addressLine1: "Via del Corso 184",
    town: "Rome",
    state: "Lazio",
    postcode: "00186",
    createdAt: "2024-04-29",
  },
];

export function CustomerListPage() {
  const router = useRouter();

  // State
  const [customers, setCustomers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Slide-over Sheet (Add Customer)
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    town: "",
    state: "",
    country: "",
    postcode: "",
  });

  // Edit Dialog
  const [editCustomer, setEditCustomer] = useState<CustomerItem | null>(null);

  // Delete Alert
  const [deleteTarget, setDeleteTarget] = useState<CustomerItem | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.customerId.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
      );
    });
  }, [customers, searchQuery]);

  // Pagination calculation
  const totalEntries = filteredCustomers.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedCustomers = useMemo(() => {
    const start = (validCurrentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, validCurrentPage, pageSize]);

  const startIndex = (validCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(validCurrentPage * pageSize, totalEntries);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedCustomers.map((c) => c.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    setSelectedIds(next);
  };

  const isAllSelected =
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) => selectedIds.has(c.id));

  // Export to CSV
  const handleExport = () => {
    const listToExport =
      selectedIds.size > 0
        ? customers.filter((c) => selectedIds.has(c.id))
        : filteredCustomers;

    const headers = [
      "Customer ID",
      "Name",
      "Email",
      "Phone",
      "Country",
      "Orders",
      "Total Spent",
      "Status",
    ];
    const rows = listToExport.map((c) => [
      c.customerId,
      `"${c.name.replace(/"/g, '""')}"`,
      c.email,
      c.phone,
      c.country,
      c.ordersCount,
      c.totalSpent.toFixed(2),
      c.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `customers_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${listToExport.length} customers to CSV`);
  };

  // Add Customer submit
  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.email.trim()) {
      toast.error("Please provide both name and email");
      return;
    }

    const randomId = Math.floor(100000 + Math.random() * 900000);
    const newCustomer: CustomerItem = {
      id: `c-new-${Date.now()}`,
      customerId: `#${randomId}`,
      name: addForm.name.trim(),
      email: addForm.email.trim(),
      phone: addForm.mobile.trim() || "+1 (555) 000-0000",
      initials: addForm.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      country: addForm.country.trim() || "United States",
      ordersCount: 0,
      totalSpent: 0.0,
      status: "Active",
      addressLine1: addForm.addressLine1,
      addressLine2: addForm.addressLine2,
      town: addForm.town,
      state: addForm.state,
      postcode: addForm.postcode,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    toast.success(`Customer ${newCustomer.name} created successfully`);
    setIsAddSheetOpen(false);
    setAddForm({
      name: "",
      email: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      town: "",
      state: "",
      country: "",
      postcode: "",
    });
  };

  // Edit Customer submit
  const handleEditCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustomer) return;

    setCustomers((prev) =>
      prev.map((c) => (c.id === editCustomer.id ? editCustomer : c))
    );
    toast.success(`Customer ${editCustomer.name} updated successfully`);
    setEditCustomer(null);
  };

  // Single Delete
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setCustomers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(deleteTarget.id);
      return next;
    });
    toast.success(`Customer ${deleteTarget.name} deleted successfully`);
    setDeleteTarget(null);
  };

  // Bulk Delete
  const handleConfirmBulkDelete = () => {
    setCustomers((prev) => prev.filter((c) => !selectedIds.has(c.id)));
    toast.success(`Deleted ${selectedIds.size} customers`);
    setSelectedIds(new Set());
    setIsBulkDeleteOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col space-y-6">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/"
          className="hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1 transition-colors"
          title="Home"
        >
          <Home className="size-3.5" />
        </Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400">Customer</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          All Customers
        </span>
      </nav>

      {/* 2. Top KPI Summary Quadrant Card */}
      <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
          {/* Top Left: Total Customers */}
          <div className="flex items-center justify-between pr-0 md:pr-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                15,678
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Total Customers
              </p>
            </div>
            <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-2xs">
              <Users className="size-5" />
            </div>
          </div>

          {/* Top Right: Average Order */}
          <div className="flex items-center justify-between md:border-l border-gray-200/70 dark:border-white/10 md:pl-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                $75
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Average Order
              </p>
            </div>
            <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-2xs">
              <Package className="size-5" />
            </div>
          </div>

          {/* Divider on MD: bottom rows */}
          {/* Bottom Left: New Customers */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200/70 dark:border-white/10 pr-0 md:pr-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                560
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                New Customers
              </p>
            </div>
            <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-2xs">
              <UserPlus className="size-5" />
            </div>
          </div>

          {/* Bottom Right: Active Customers */}
          <div className="flex items-center justify-between pt-6 border-t md:border-l border-gray-200/70 dark:border-white/10 md:pl-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                3,432
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Active Customers
              </p>
            </div>
            <div className="size-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-2xs">
              <UserCheck className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Customers Datagrid Card */}
      <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs overflow-hidden">
        {/* Datagrid Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-200/70 dark:border-white/10 bg-gray-50/40 dark:bg-white/[0.01]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search User..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 pl-10 pr-4 rounded-xl border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#181818] text-xs sm:text-sm placeholder:text-gray-400 focus-visible:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Action buttons on the right */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Selected bulk delete trigger */}
            {selectedIds.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsBulkDeleteOpen(true)}
                className="h-10 px-3.5 rounded-xl text-xs font-semibold"
              >
                <Trash2 className="size-3.5 mr-1.5" />
                Delete ({selectedIds.size})
              </Button>
            )}

            {/* Page size select */}
            <Select
              value={String(pageSize)}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-[78px] rounded-xl border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#181818] text-xs sm:text-sm font-medium">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200 dark:border-white/10">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            {/* Export button */}
            <Button
              variant="outline"
              onClick={handleExport}
              className="h-10 px-4 rounded-xl border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#181818] text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 shadow-2xs gap-1.5"
            >
              <Upload className="size-3.5" />
              <span>Export</span>
            </Button>

            {/* + Add Customer button */}
            <Button
              onClick={() => setIsAddSheetOpen(true)}
              className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors gap-1.5 cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Add Customer</span>
            </Button>
          </div>
        </div>

        {/* Datagrid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200/70 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-semibold bg-gray-50/50 dark:bg-white/[0.01]">
                <th className="w-10 px-3 py-3.5 text-center">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) =>
                      handleSelectAll(Boolean(checked))
                    }
                    aria-label="Select all customers"
                  />
                </th>
                <th className="px-3 sm:px-4 py-3.5 font-semibold">Customer</th>
                <th className="px-3 py-3.5 font-semibold whitespace-nowrap">
                  Customer ID
                </th>
                <th className="px-3 py-3.5 font-semibold">Country</th>
                <th className="px-3 py-3.5 font-semibold text-center">Order</th>
                <th className="px-3 py-3.5 font-semibold">Total Spent</th>
                <th className="w-16 px-3 py-3.5 text-right font-semibold pr-4 sm:pr-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No customers found matching &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((customer) => {
                  const isChecked = selectedIds.has(customer.id);
                  return (
                    <tr
                      key={customer.id}
                      className={`hover:bg-gray-50/70 dark:hover:bg-white/[0.02] transition-colors ${
                        isChecked
                          ? "bg-indigo-50/40 dark:bg-indigo-950/20"
                          : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="w-10 px-3 py-3.5 text-center">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            handleSelectRow(customer.id, Boolean(checked))
                          }
                          aria-label={`Select ${customer.name}`}
                        />
                      </td>

                      {/* Customer: Avatar + Name + Email */}
                      <td className="px-3 sm:px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          {customer.avatar ? (
                            <div className="size-9 rounded-full overflow-hidden shrink-0 border border-gray-200/80 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                              <Image
                                src={customer.avatar}
                                alt={customer.name}
                                width={36}
                                height={36}
                                className="size-full object-cover aspect-square"
                              />
                            </div>
                          ) : (
                            <div className="size-9 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200/80 dark:border-white/10 flex items-center justify-center shrink-0 font-semibold text-xs text-gray-700 dark:text-gray-300">
                              {customer.initials ||
                                customer.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <Link
                              href={`/customers/${customer.id}`}
                              className="font-semibold text-gray-900 dark:text-white text-sm hover:underline line-clamp-1 cursor-pointer"
                            >
                              {customer.name}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Customer ID */}
                      <td className="px-3 py-3.5 text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {customer.customerId}
                      </td>

                      {/* Country */}
                      <td className="px-3 py-3.5 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {customer.country}
                      </td>

                      {/* Order Count */}
                      <td className="px-3 py-3.5 text-sm text-gray-700 dark:text-gray-300 font-medium text-center">
                        {customer.ordersCount}
                      </td>

                      {/* Total Spent */}
                      <td className="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        ${customer.totalSpent.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      {/* Actions */}
                      <td className="w-16 px-3 py-3.5 text-right pr-4 sm:pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                            >
                              <MoreVertical className="size-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 rounded-xl border-gray-200 dark:border-white/10"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/customers/${customer.id}`)
                              }
                              className="cursor-pointer gap-2 text-xs"
                            >
                              <Eye className="size-3.5 text-gray-500" />
                              <span>View</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => setEditCustomer({ ...customer })}
                              className="cursor-pointer gap-2 text-xs"
                            >
                              <Pencil className="size-3.5 text-gray-500" />
                              <span>Edit</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="dark:bg-white/10" />

                            <DropdownMenuItem
                              onClick={() => setDeleteTarget(customer)}
                              className="cursor-pointer gap-2 text-xs text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                            >
                              <Trash2 className="size-3.5" />
                              <span>Delete</span>
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

        {/* Datagrid Footer / Pagination */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/70 dark:border-white/10 bg-gray-50/30 dark:bg-white/[0.01]">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {totalEntries === 0 ? (
              "Showing 0 entries"
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {startIndex}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalEntries}
                </span>{" "}
                entries
              </>
            )}
          </p>

          {/* Pagination Navigation */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="size-8 rounded-lg border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-300 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show pages: first, last, current, current - 1, current + 1
              if (
                totalPages > 6 &&
                page !== 1 &&
                page !== totalPages &&
                Math.abs(page - validCurrentPage) > 1
              ) {
                if (
                  page === 2 &&
                  validCurrentPage > 3
                ) {
                  return (
                    <span
                      key={page}
                      className="px-1 text-xs text-gray-400 select-none"
                    >
                      ...
                    </span>
                  );
                }
                if (
                  page === totalPages - 1 &&
                  validCurrentPage < totalPages - 2
                ) {
                  return (
                    <span
                      key={page}
                      className="px-1 text-xs text-gray-400 select-none"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              }

              const isActive = page === validCurrentPage;
              return (
                <Button
                  key={page}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent"
                      : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="size-8 rounded-lg border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-300 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Slide-Over Sheet ("Add New Customer") */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent
          side="right"
          className="sm:max-w-lg w-full p-0 flex flex-col justify-between bg-white dark:bg-[#141414] border-l border-gray-200 dark:border-white/10"
        >
          <div>
            <SheetHeader className="p-6 border-b border-gray-200/80 dark:border-white/10">
              <SheetTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Customer
              </SheetTitle>
              <SheetDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enter customer profile details and initial shipping address.
              </SheetDescription>
            </SheetHeader>

            {/* Scrollable form body */}
            <form
              id="add-customer-form"
              onSubmit={handleAddCustomerSubmit}
              className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Basic Information
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-name" className="text-xs font-medium">
                    Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="cust-name"
                    required
                    placeholder="John Doe"
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                    className="rounded-xl h-10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-email" className="text-xs font-medium">
                    Email <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="cust-email"
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={addForm.email}
                    onChange={(e) =>
                      setAddForm({ ...addForm, email: e.target.value })
                    }
                    className="rounded-xl h-10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-mobile" className="text-xs font-medium">
                    Mobile
                  </Label>
                  <Input
                    id="cust-mobile"
                    placeholder="+(123) 456-7890"
                    value={addForm.mobile}
                    onChange={(e) =>
                      setAddForm({ ...addForm, mobile: e.target.value })
                    }
                    className="rounded-xl h-10 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-white/5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Shipping Information
                </h3>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-addr1" className="text-xs font-medium">
                    Address Line 1
                  </Label>
                  <Input
                    id="cust-addr1"
                    placeholder="45 Roker Terrace"
                    value={addForm.addressLine1}
                    onChange={(e) =>
                      setAddForm({ ...addForm, addressLine1: e.target.value })
                    }
                    className="rounded-xl h-10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cust-addr2" className="text-xs font-medium">
                    Address Line 2
                  </Label>
                  <Input
                    id="cust-addr2"
                    placeholder="Apartment, studio, or floor"
                    value={addForm.addressLine2}
                    onChange={(e) =>
                      setAddForm({ ...addForm, addressLine2: e.target.value })
                    }
                    className="rounded-xl h-10 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cust-town" className="text-xs font-medium">
                      Town / City
                    </Label>
                    <Input
                      id="cust-town"
                      placeholder="New York"
                      value={addForm.town}
                      onChange={(e) =>
                        setAddForm({ ...addForm, town: e.target.value })
                      }
                      className="rounded-xl h-10 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cust-state" className="text-xs font-medium">
                      State / Province
                    </Label>
                    <Input
                      id="cust-state"
                      placeholder="NY"
                      value={addForm.state}
                      onChange={(e) =>
                        setAddForm({ ...addForm, state: e.target.value })
                      }
                      className="rounded-xl h-10 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cust-country"
                      className="text-xs font-medium"
                    >
                      Country
                    </Label>
                    <Input
                      id="cust-country"
                      placeholder="United States"
                      value={addForm.country}
                      onChange={(e) =>
                        setAddForm({ ...addForm, country: e.target.value })
                      }
                      className="rounded-xl h-10 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cust-postcode"
                      className="text-xs font-medium"
                    >
                      Postcode
                    </Label>
                    <Input
                      id="cust-postcode"
                      placeholder="10001"
                      value={addForm.postcode}
                      onChange={(e) =>
                        setAddForm({ ...addForm, postcode: e.target.value })
                      }
                      className="rounded-xl h-10 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <SheetFooter className="p-6 border-t border-gray-200/80 dark:border-white/10 flex sm:flex-row items-center justify-end gap-3 bg-gray-50/50 dark:bg-white/[0.02]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddSheetOpen(false)}
              className="rounded-xl h-10 px-5 text-xs sm:text-sm font-medium"
            >
              Discard
            </Button>
            <Button
              type="submit"
              form="add-customer-form"
              className="rounded-xl h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold"
            >
              Add Customer
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* 5. Edit Customer Dialog */}
      <Dialog
        open={Boolean(editCustomer)}
        onOpenChange={(open) => !open && setEditCustomer(null)}
      >
        <DialogContent className="sm:max-w-md rounded-2xl border-gray-200 dark:border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Edit Customer
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500 dark:text-gray-400">
              Update customer profile details.
            </DialogDescription>
          </DialogHeader>

          {editCustomer && (
            <form
              onSubmit={handleEditCustomerSubmit}
              className="space-y-4 py-2"
            >
              <div className="space-y-1.5">
                <Label htmlFor="edit-name" className="text-xs font-medium">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editCustomer.name}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, name: e.target.value })
                  }
                  className="rounded-xl text-xs sm:text-sm h-10"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-email" className="text-xs font-medium">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, email: e.target.value })
                  }
                  className="rounded-xl text-xs sm:text-sm h-10"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-phone" className="text-xs font-medium">
                    Phone
                  </Label>
                  <Input
                    id="edit-phone"
                    value={editCustomer.phone}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        phone: e.target.value,
                      })
                    }
                    className="rounded-xl text-xs sm:text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-country" className="text-xs font-medium">
                    Country
                  </Label>
                  <Input
                    id="edit-country"
                    value={editCustomer.country}
                    onChange={(e) =>
                      setEditCustomer({
                        ...editCustomer,
                        country: e.target.value,
                      })
                    }
                    className="rounded-xl text-xs sm:text-sm h-10"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 flex sm:flex-row items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditCustomer(null)}
                  className="rounded-xl text-xs h-9 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 6. Single Delete Alert Dialog */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-2xl border-gray-200 dark:border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-gray-900 dark:text-white">
              Delete Customer
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {deleteTarget?.name}
              </span>{" "}
              ({deleteTarget?.customerId})? This will permanently remove their
              record and order associations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs h-9 px-4">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-xl text-xs h-9 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold"
            >
              Delete Customer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 7. Bulk Delete Alert Dialog */}
      <AlertDialog
        open={isBulkDeleteOpen}
        onOpenChange={setIsBulkDeleteOpen}
      >
        <AlertDialogContent className="rounded-2xl border-gray-200 dark:border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-gray-900 dark:text-white">
              Delete Selected Customers
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                {selectedIds.size}
              </span>{" "}
              selected customers? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs h-9 px-4">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmBulkDelete}
              className="rounded-xl text-xs h-9 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold"
            >
              Delete Selected
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
