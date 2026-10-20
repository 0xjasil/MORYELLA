"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowUp,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCheck,
  RotateCcw,
  AlertCircle,
  Home,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export interface CommerceoOrderItem {
  id: string;
  orderNumber: string;
  date: string;
  timestamp: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  totalAmount: number;
  payment: "Paid" | "Pending" | "Failed" | "Cancelled";
  status: "Delivered" | "Dispatched" | "Out for Delivery" | "Ready to Pickup" | "Cancelled";
  method: {
    type: "paypal" | "mastercard" | "visa" | "cod";
    last4?: string;
    label: string;
  };
}

const DEFAULT_ORDERS: CommerceoOrderItem[] = [
  {
    id: "5434",
    orderNumber: "#5434",
    date: "May 16, 2022, 2:11 PM",
    timestamp: "2022-05-16T14:11:00Z",
    customer: {
      id: "c-1",
      name: "Gabrielle Feyer",
      email: "gfeyer0@nyu.edu",
      avatar: "/images/avatars/8.webp",
    },
    totalAmount: 289.0,
    payment: "Paid",
    status: "Dispatched",
    method: { type: "paypal", last4: "6522", label: "PayPal" },
  },
  {
    id: "6745",
    orderNumber: "#6745",
    date: "May 3, 2023, 7:26 PM",
    timestamp: "2023-05-03T19:26:00Z",
    customer: {
      id: "c-2",
      name: "Jackson Deignan",
      email: "jdeignan1@dell.com",
      avatar: "/images/avatars/2.webp",
    },
    totalAmount: 415.5,
    payment: "Failed",
    status: "Dispatched",
    method: { type: "paypal", last4: "7538", label: "PayPal" },
  },
  {
    id: "6087",
    orderNumber: "#6087",
    date: "Dec 15, 2022, 6:51 PM",
    timestamp: "2022-12-15T18:51:00Z",
    customer: {
      id: "c-3",
      name: "Tanya Crum",
      email: "tcrum2@yandex.ru",
      avatar: "/images/avatars/7.webp",
    },
    totalAmount: 142.0,
    payment: "Cancelled",
    status: "Out for Delivery",
    method: { type: "mastercard", last4: "5170", label: "Mastercard" },
  },
  {
    id: "7825",
    orderNumber: "#7825",
    date: "Aug 5, 2022, 9:18 AM",
    timestamp: "2022-08-05T09:18:00Z",
    customer: {
      id: "c-4",
      name: "Dallis Dillestone",
      email: "ddillestone3@archive.org",
      avatar: "/images/avatars/4.webp",
    },
    totalAmount: 699.0,
    payment: "Failed",
    status: "Out for Delivery",
    method: { type: "paypal", last4: "1748", label: "PayPal" },
  },
  {
    id: "5604",
    orderNumber: "#5604",
    date: "Jun 18, 2022, 3:34 PM",
    timestamp: "2022-06-18T15:34:00Z",
    customer: {
      id: "c-5",
      name: "Conan Kennham",
      email: "ckennham4@cnn.com",
      avatar: "/images/avatars/9.webp",
    },
    totalAmount: 184.25,
    payment: "Failed",
    status: "Dispatched",
    method: { type: "mastercard", last4: "6425", label: "Mastercard" },
  },
  {
    id: "5390",
    orderNumber: "#5390",
    date: "Oct 14, 2022, 6:12 PM",
    timestamp: "2022-10-14T18:12:00Z",
    customer: {
      id: "c-6",
      name: "Daven Brocket",
      email: "dbrocket5@epa.gov",
      avatar: "/images/avatars/13.webp",
    },
    totalAmount: 319.99,
    payment: "Failed",
    status: "Delivered",
    method: { type: "paypal", last4: "1694", label: "PayPal" },
  },
  {
    id: "7279",
    orderNumber: "#7279",
    date: "Aug 8, 2022, 6:09 AM",
    timestamp: "2022-08-08T06:09:00Z",
    customer: {
      id: "c-7",
      name: "Rex Farbrace",
      email: "rfarbrace6@sourceforge.net",
      avatar: "/images/avatars/5.webp",
    },
    totalAmount: 89.5,
    payment: "Pending",
    status: "Delivered",
    method: { type: "mastercard", last4: "1883", label: "Mastercard" },
  },
  {
    id: "7003",
    orderNumber: "#7003",
    date: "Jun 10, 2022, 12:59 PM",
    timestamp: "2022-06-10T12:59:00Z",
    customer: {
      id: "c-8",
      name: "Tann Biaggetti",
      email: "tbiaggetti7@eepurl.com",
      avatar: "/images/avatars/6.webp",
    },
    totalAmount: 520.0,
    payment: "Cancelled",
    status: "Dispatched",
    method: { type: "visa", last4: "5047", label: "Visa" },
  },
  {
    id: "8632",
    orderNumber: "#8632",
    date: "Oct 25, 2022, 10:48 AM",
    timestamp: "2022-10-25T10:48:00Z",
    customer: {
      id: "c-9",
      name: "Abagael Drogan",
      email: "adrogan8@storify.com",
      avatar: "/images/avatars/11.webp",
    },
    totalAmount: 238.1,
    payment: "Cancelled",
    status: "Cancelled",
    method: { type: "paypal", last4: "1945", label: "PayPal" },
  },
  {
    id: "8501",
    orderNumber: "#8501",
    date: "Nov 2, 2022, 2:19 PM",
    timestamp: "2022-11-02T14:19:00Z",
    customer: {
      id: "c-10",
      name: "Esme Sangwin",
      email: "esangwin9@taobao.com",
      avatar: "/images/avatars/12.webp",
    },
    totalAmount: 465.0,
    payment: "Failed",
    status: "Out for Delivery",
    method: { type: "mastercard", last4: "3526", label: "Mastercard" },
  },
  {
    id: "ORD-9421",
    orderNumber: "#ORD-9421",
    date: "Oct 10, 2026, 2:20 PM",
    timestamp: "2026-10-10T14:20:00Z",
    customer: {
      id: "u1",
      name: "Sophia Carter",
      email: "sophia.carter@example.com",
      avatar: "/images/avatars/1.webp",
    },
    totalAmount: 438.0,
    payment: "Paid",
    status: "Delivered",
    method: { type: "visa", last4: "9421", label: "Visa" },
  },
  {
    id: "ORD-9422",
    orderNumber: "#ORD-9422",
    date: "Oct 12, 2026, 11:05 AM",
    timestamp: "2026-10-12T11:05:00Z",
    customer: {
      id: "u2",
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      avatar: "/images/avatars/3.webp",
    },
    totalAmount: 299.0,
    payment: "Paid",
    status: "Dispatched",
    method: { type: "mastercard", last4: "9422", label: "Mastercard" },
  },
  {
    id: "ORD-9423",
    orderNumber: "#ORD-9423",
    date: "Oct 13, 2026, 9:40 AM",
    timestamp: "2026-10-13T09:40:00Z",
    customer: {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.r@example.com",
      avatar: "/images/avatars/10.webp",
    },
    totalAmount: 119.0,
    payment: "Pending",
    status: "Ready to Pickup",
    method: { type: "cod", label: "Cash on Delivery" },
  },
  {
    id: "ORD-9424",
    orderNumber: "#ORD-9424",
    date: "Oct 14, 2026, 4:15 PM",
    timestamp: "2026-10-14T16:15:00Z",
    customer: {
      id: "u4",
      name: "Liam O'Connor",
      email: "liam.oc@example.com",
      avatar: "/images/avatars/14.webp",
    },
    totalAmount: 649.0,
    payment: "Paid",
    status: "Delivered",
    method: { type: "paypal", last4: "9424", label: "PayPal" },
  },
];

function PaymentMethodBadge({ method }: { method: CommerceoOrderItem["method"] }) {
  if (method.type === "paypal") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
        <div className="size-5 rounded-full bg-[#003087] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
          P
        </div>
        <span>...{method.last4 || "6522"}</span>
      </div>
    );
  }
  if (method.type === "mastercard") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
        <div className="flex items-center -space-x-1 shrink-0">
          <div className="size-3.5 rounded-full bg-[#EB001B]" />
          <div className="size-3.5 rounded-full bg-[#F79E1B]/90" />
        </div>
        <span>...{method.last4 || "5170"}</span>
      </div>
    );
  }
  if (method.type === "visa") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
        <div className="size-5 rounded-md bg-[#1A1F71] text-white flex items-center justify-center font-bold text-[9px] shrink-0 shadow-2xs">
          VISA
        </div>
        <span>...{method.last4 || "7538"}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
      <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-[10px] font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
        COD
      </span>
      <span>Cash</span>
    </div>
  );
}

function PaymentStatusBadge({ payment }: { payment: CommerceoOrderItem["payment"] }) {
  switch (payment) {
    case "Paid":
      return (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Paid
        </span>
      );
    case "Pending":
      return (
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          Pending
        </span>
      );
    case "Failed":
      return (
        <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
          Failed
        </span>
      );
    case "Cancelled":
      return (
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Cancelled
        </span>
      );
    default:
      return <span className="text-xs font-medium text-gray-500">{payment}</span>;
  }
}

function FulfillmentBadge({ status }: { status: CommerceoOrderItem["status"] }) {
  switch (status) {
    case "Delivered":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          Delivered
        </span>
      );
    case "Dispatched":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
          Dispatched
        </span>
      );
    case "Out for Delivery":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
          Out for Delivery
        </span>
      );
    case "Ready to Pickup":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          Ready to Pickup
        </span>
      );
    case "Cancelled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/20">
          Cancelled
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          {status}
        </span>
      );
  }
}

export function CommerceoOrderList() {
  const router = useRouter();
  const [orders, setOrders] = useState<CommerceoOrderItem[]>(DEFAULT_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dialog states
  const [editingOrder, setEditingOrder] = useState<CommerceoOrderItem | null>(null);
  const [newStatus, setNewStatus] = useState<CommerceoOrderItem["status"]>("Delivered");
  const [newPayment, setNewPayment] = useState<CommerceoOrderItem["payment"]>("Paid");
  const [deletingOrder, setDeletingOrder] = useState<CommerceoOrderItem | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Filtering
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        order.orderNumber.toLowerCase().includes(q) ||
        order.customer.name.toLowerCase().includes(q) ||
        order.customer.email.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q) ||
        order.payment.toLowerCase().includes(q);

      // Status
      const matchStatus =
        statusFilter === "ALL" ||
        order.status.toUpperCase() === statusFilter.toUpperCase();

      // Payment
      const matchPayment =
        paymentFilter === "ALL" ||
        order.payment.toUpperCase() === paymentFilter.toUpperCase();

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedOrders = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, safeCurrentPage, pageSize]);

  const startEntry = filteredOrders.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endEntry = Math.min(safeCurrentPage * pageSize, filteredOrders.length);

  // Selection
  const isAllSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((order) => selectedIds.includes(order.id));
  const isSomeSelected =
    paginatedOrders.some((order) => selectedIds.includes(order.id)) && !isAllSelected;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      const pageIds = new Set(paginatedOrders.map((o) => o.id));
      setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)));
    } else {
      const pageIds = paginatedOrders.map((o) => o.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Order", "Date", "Customer Name", "Customer Email", "Payment", "Status", "Amount", "Method"];
    const rows = filteredOrders.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.date}"`,
      `"${o.customer.name.replace(/"/g, '""')}"`,
      `"${o.customer.email}"`,
      `"${o.payment}"`,
      `"${o.status}"`,
      o.totalAmount,
      `"${o.method.label} ${o.method.last4 ? "..." + o.method.last4 : ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredOrders.length} orders to CSV`);
  };

  // Status Dialog
  const handleOpenEdit = (order: CommerceoOrderItem) => {
    setEditingOrder(order);
    setNewStatus(order.status);
    setNewPayment(order.payment);
  };

  const handleSaveStatus = () => {
    if (!editingOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === editingOrder.id ? { ...o, status: newStatus, payment: newPayment } : o
      )
    );
    toast.success(`Order ${editingOrder.orderNumber} updated`);
    setEditingOrder(null);
  };

  // Delete
  const handleDeleteConfirm = () => {
    if (!deletingOrder) return;
    setOrders((prev) => prev.filter((o) => o.id !== deletingOrder.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deletingOrder.id));
    toast.success(`Order ${deletingOrder.orderNumber} deleted`);
    setDeletingOrder(null);
  };

  const handleBulkDelete = () => {
    setOrders((prev) => prev.filter((o) => !selectedIds.includes(o.id)));
    toast.success(`${selectedIds.length} orders deleted`);
    setSelectedIds([]);
    setIsBulkDeleteOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/"
          className="hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1 transition-colors"
          title="Home"
        >
          <Home className="size-3.5" />
        </Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400">Order</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Order List</span>
      </nav>

      {/* Page Title & Subtitle */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Order List
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Manage customer orders, track payments, fulfillment status, and delivery logistics.
        </p>
      </div>

      {/* 1. Four Metric KPI Cards in our color theme */}
      <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/70 dark:divide-white/10">
          {/* KPI 1: Pending Payment */}
          <div className="flex items-start justify-between sm:pr-6">
            <div className="space-y-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                56
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Pending Payment
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-2xs">
              <Calendar className="size-5" />
            </div>
          </div>

          {/* KPI 2: Completed */}
          <div className="flex items-start justify-between pt-4 sm:pt-0 sm:px-6">
            <div className="space-y-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                12,689
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Completed
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
              <CheckCheck className="size-5" />
            </div>
          </div>

          {/* KPI 3: Refunded */}
          <div className="flex items-start justify-between pt-4 sm:pt-0 sm:px-6">
            <div className="space-y-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                124
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Refunded
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-2xs">
              <RotateCcw className="size-5" />
            </div>
          </div>

          {/* KPI 4: Failed */}
          <div className="flex items-start justify-between pt-4 sm:pt-0 sm:pl-6">
            <div className="space-y-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                32
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Failed
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shadow-2xs">
              <AlertCircle className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Orders Table Card */}
      <div className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#141414] shadow-xs overflow-hidden">
        {/* Action Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-200/70 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
          {/* Search Input */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search User or order..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-10 bg-white dark:bg-[#181818] border-gray-200 dark:border-white/10 rounded-xl text-sm shadow-2xs focus-visible:ring-indigo-500"
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1.5 rounded-xl text-xs font-medium text-indigo-700 dark:text-indigo-300 animate-in fade-in">
                <span>{selectedIds.length} selected</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBulkDeleteOpen(true)}
                  className="h-6 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs"
                >
                  Delete Selected
                </Button>
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-36 bg-white dark:bg-[#181818] border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                <SelectItem value="OUT FOR DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="READY TO PICKUP">Ready to Pickup</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Page Size */}
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-20 bg-white dark:bg-[#181818] border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button matching reference: "↑ Export" */}
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="h-10 gap-1.5 px-4 rounded-xl border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 font-medium text-xs shadow-2xs"
            >
              <ArrowUp className="size-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200/70 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] h-12 text-gray-500 dark:text-gray-400 text-xs font-semibold">
                <th className="w-12 px-4 sm:px-6 align-middle">
                  <Checkbox
                    checked={Boolean(isAllSelected || isSomeSelected)}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[100px]">
                  Order
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[170px]">
                  Date
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[240px]">
                  Customers
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[110px]">
                  Payment
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[140px]">
                  Status
                </th>
                <th className="px-4 py-3 align-middle font-semibold min-w-[130px]">
                  Method
                </th>
                <th className="px-4 sm:px-6 py-3 align-middle font-semibold text-right w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No orders found matching your search or filters.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const isSelected = selectedIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-gray-50/70 dark:hover:bg-white/[0.02] transition-colors h-16 ${
                        isSelected ? "bg-indigo-50/30 dark:bg-indigo-500/[0.05]" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 sm:px-6 align-middle">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectOne(order.id)}
                          aria-label={`Select ${order.orderNumber}`}
                        />
                      </td>

                      {/* Order Number Link */}
                      <td className="px-4 py-3 align-middle">
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 align-middle text-sm text-gray-700 dark:text-gray-300">
                        {order.date}
                      </td>

                      {/* Customer info */}
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full overflow-hidden shrink-0 border border-gray-200/80 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-2xs">
                            {order.customer.avatar ? (
                              <Image
                                src={order.customer.avatar}
                                alt={order.customer.name}
                                width={36}
                                height={36}
                                className="size-full object-cover"
                              />
                            ) : (
                              <span>{order.customer.name.slice(0, 2).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight truncate">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5 truncate max-w-[180px]">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-3 align-middle">
                        <PaymentStatusBadge payment={order.payment} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 align-middle">
                        <FulfillmentBadge status={order.status} />
                      </td>

                      {/* Method */}
                      <td className="px-4 py-3 align-middle">
                        <PaymentMethodBadge method={order.method} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 sm:px-6 py-3 align-middle text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-lg"
                              aria-label="Row actions"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-md border-gray-200/80 dark:border-white/10">
                            <DropdownMenuItem
                              onClick={() => router.push(`/orders/${order.id}`)}
                              className="cursor-pointer gap-2"
                            >
                              <Eye className="size-4 text-gray-500" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleOpenEdit(order)}
                              className="cursor-pointer gap-2"
                            >
                              <Edit className="size-4 text-indigo-600 dark:text-indigo-400" />
                              <span>Update Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeletingOrder(order)}
                              className="cursor-pointer gap-2 text-rose-600 focus:text-rose-600"
                            >
                              <Trash2 className="size-4" />
                              <span>Delete Order</span>
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

        {/* Pagination Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-200/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-white/[0.01]">
          <div>
            Showing <span className="font-medium text-gray-900 dark:text-white">{startEntry}</span> to{" "}
            <span className="font-medium text-gray-900 dark:text-white">{endEntry}</span> of{" "}
            <span className="font-medium text-gray-900 dark:text-white">{filteredOrders.length}</span> entries
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="size-8 rounded-lg p-0 border-gray-200 dark:border-white/10"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === safeCurrentPage;
              return (
                <Button
                  key={pageNum}
                  variant={isActive ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`size-8 rounded-lg text-xs font-semibold p-0 ${
                    isActive
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600 shadow-xs"
                      : "text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="size-8 rounded-lg p-0 border-gray-200 dark:border-white/10"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Status Dialog */}
      <Dialog open={Boolean(editingOrder)} onOpenChange={(open) => !open && setEditingOrder(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl border-gray-200 dark:border-white/10">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Update Order {editingOrder?.orderNumber}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Modify the payment and fulfillment status for customer {editingOrder?.customer.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Fulfillment Status
              </label>
              <Select
                value={newStatus}
                onValueChange={(val) => setNewStatus(val as CommerceoOrderItem["status"])}
              >
                <SelectTrigger className="w-full h-10 rounded-xl text-sm bg-white dark:bg-[#181818] border-gray-200 dark:border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Dispatched">Dispatched</SelectItem>
                  <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                  <SelectItem value="Ready to Pickup">Ready to Pickup</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Payment Status
              </label>
              <Select
                value={newPayment}
                onValueChange={(val) => setNewPayment(val as CommerceoOrderItem["payment"])}
              >
                <SelectTrigger className="w-full h-10 rounded-xl text-sm bg-white dark:bg-[#181818] border-gray-200 dark:border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditingOrder(null)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveStatus}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Single Order Confirmation */}
      <AlertDialog
        open={Boolean(deletingOrder)}
        onOpenChange={(open) => !open && setDeletingOrder(null)}
      >
        <AlertDialogContent className="rounded-2xl border-gray-200 dark:border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order {deletingOrder?.orderNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order for customer {deletingOrder?.customer.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-rose-600 text-white hover:bg-rose-700 rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Alert Dialog */}
      <AlertDialog open={isBulkDeleteOpen} onOpenChange={setIsBulkDeleteOpen}>
        <AlertDialogContent className="rounded-2xl border-gray-200 dark:border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Orders</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedIds.length} orders? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-rose-600 text-white hover:bg-rose-700 rounded-xl"
            >
              Delete All Selected
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
