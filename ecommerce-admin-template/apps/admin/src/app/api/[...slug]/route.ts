// src/app/api/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  mockAdminProfile,
  mockSession,
  mockBrands,
  mockCategories,
  mockSubcategories,
  mockAttributes,
  mockProducts,
  mockOrders,
  mockUsers,
  mockBanners,
  mockCoupons,
  mockActivityLogs,
  mockPaymentLogs,
  mockVendors,
  mockPages,
  mockReviews,
} from "@/lib/mock-data";

// In-memory stores so mock-mode CRUD persists for the dev session
interface MockVendor {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MockPage {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  status: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

let vendorsStore: MockVendor[] = mockVendors.map((v) => ({ ...v }));
let pagesStore: MockPage[] = mockPages.map((p) => ({ ...p }));

function newMockId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

type RouteParams = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const path = slug.join("/");

  // 1. Better-Auth mock endpoints
  if (slug[0] === "auth-admin") {
    if (slug[1] === "get-session") {
      return NextResponse.json(mockSession);
    }
    return NextResponse.json({ success: true, session: mockSession });
  }

  // 2. Admin profile & settings
  if (slug[0] === "admin") {
    if (slug[1] === "profile") {
      return NextResponse.json({ profile: mockAdminProfile });
    }
    return NextResponse.json({ success: true });
  }

  // 3. Analytics endpoints
  if (slug[0] === "analytics") {
    const sub = slug[1];
    if (sub === "metrics") {
      return NextResponse.json({
        totalRevenue: 124580,
        totalOrders: 342,
        averageOrderValue: 364.27,
        conversionRate: 3.4,
      });
    }
    if (sub === "summary") {
      return NextResponse.json({
        totalProducts: mockProducts.length,
        totalVariants: 8,
        totalOrders: mockOrders.length,
        totalRevenue: 124580,
        lowStockProducts: [
          { id: "prod-2", name: "Merino Wool Knit Overshirt", currentStock: 4 },
        ],
        brandsCount: mockBrands.length,
        categoriesCount: mockCategories.length,
        subcategoriesCount: mockSubcategories.length,
      });
    }
    if (sub === "sales-metrics") {
      return NextResponse.json({
        totalRevenue: 124580,
        totalOrders: 342,
        averageOrderValue: 364.27,
      });
    }
    if (sub === "top-products") {
      return NextResponse.json(
        mockProducts.map((p, idx) => ({
          id: p.id,
          variantId: p.variants[0]?.id,
          name: p.name,
          image: p.image,
          brand: p.brand?.name || "Brand",
          category: p.category?.name || "Category",
          totalQuantitySold: 45 - idx * 8,
          totalRevenue: (45 - idx * 8) * (p.variants[0]?.price || 100),
          currentStock: p.variants[0]?.qty || 15,
        }))
      );
    }
    if (sub === "low-stock") {
      return NextResponse.json([
        {
          id: "prod-2",
          name: "Merino Wool Knit Overshirt",
          brand: "Nordic Thread",
          currentStock: 4,
        },
      ]);
    }
    if (sub === "recent-orders") {
      return NextResponse.json(mockOrders);
    }
    if (sub === "filters") {
      return NextResponse.json({
        years: [2026, 2025, 2024],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      });
    }
    if (sub === "orders-summary") {
      return NextResponse.json(
        mockOrders.map((o) => ({
          id: o.id,
          userName: o.user.name,
          userEmail: o.user.email,
          totalAmount: o.totalAmount,
          status: o.status,
          paymentMethod: o.paymentMethod,
          razorpayPaymentId: o.razorpayPaymentId,
          createdAt: o.createdAt,
        }))
      );
    }
    if (sub === "customers-report") {
      return NextResponse.json({
        totalCustomers: mockUsers.length,
        topCustomers: mockUsers.map((u, i) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          totalOrders: 10 - i * 2,
          totalSpent: (10 - i * 2) * 220,
          joinedAt: u.createdAt,
        })),
      });
    }
  }

  // 4. Products & Catalog
  if (slug[0] === "products") {
    if (slug[1] && slug[1] !== "withvariant") {
      const product = mockProducts.find((p) => p.id === slug[1]) || mockProducts[0];
      return NextResponse.json({ data: product });
    }
    return NextResponse.json({
      data: mockProducts,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalProducts: mockProducts.length,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  }

  if (slug[0] === "brands") {
    return NextResponse.json(mockBrands);
  }

  if (slug[0] === "categories") {
    return NextResponse.json(mockCategories);
  }

  if (slug[0] === "subcategories") {
    return NextResponse.json(mockSubcategories);
  }

  if (slug[0] === "attributes") {
    if (slug[1] === "values") {
      const allValues = mockAttributes.flatMap((a) => a.values);
      return NextResponse.json(allValues);
    }
    return NextResponse.json(mockAttributes);
  }

  // 5. Orders
  if (slug[0] === "orders") {
    if (slug[1]) {
      const order = mockOrders.find((o) => o.id === slug[1]) || mockOrders[0];
      return NextResponse.json({ data: order });
    }
    return NextResponse.json({
      data: mockOrders,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalOrders: mockOrders.length,
      },
    });
  }

  // 6. Users / Customers
  if (slug[0] === "users") {
    return NextResponse.json({
      users: mockUsers,
      pagination: {
        totalPages: 1,
        totalUsers: mockUsers.length,
        currentPage: 1,
      },
    });
  }

  // 7. Inventory
  if (slug[0] === "inventory") {
    const inventoryData = mockProducts.map((p) => ({
      ...p,
      sku: p.variants[0]?.sku || "SKU-DEF",
      price: p.variants[0]?.price || 199,
      qty: p.variants[0]?.qty || 10,
      isLowStock: (p.variants[0]?.qty || 10) < 5,
    }));
    return NextResponse.json({
      data: inventoryData,
      meta: {
        total: inventoryData.length,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      },
    });
  }

  // 8. Coupons
  if (slug[0] === "coupons") {
    return NextResponse.json({ success: true, data: mockCoupons });
  }

  // 9. Banners
  if (slug[0] === "banners") {
    return NextResponse.json(mockBanners);
  }

  // 10. Logs
  if (slug[0] === "logs") {
    if (slug[1] === "activity") {
      return NextResponse.json({ success: true, data: mockActivityLogs });
    }
    if (slug[1] === "payment") {
      return NextResponse.json({ success: true, data: mockPaymentLogs });
    }
  }

  // Vendors
  if (slug[0] === "vendors") {
    if (slug[1]) {
      const vendor = vendorsStore.find((v) => v.id === slug[1]);
      if (!vendor) {
        return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
      }
      return NextResponse.json({ data: vendor });
    }
    return NextResponse.json(vendorsStore);
  }

  // Pages (CMS static pages)
  if (slug[0] === "pages") {
    if (slug[1]) {
      const page = pagesStore.find((p) => p.id === slug[1]);
      if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
      return NextResponse.json({ data: page });
    }
    return NextResponse.json(pagesStore);
  }

  // Product reviews
  if (slug[0] === "reviews") {
    return NextResponse.json(mockReviews);
  }

  // Fallback
  return NextResponse.json({
    message: `Mock API endpoint for /${path}`,
    success: true,
  });
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  if (slug[0] === "auth-admin") {
    return NextResponse.json(mockSession);
  }

  const body = await request.json().catch(() => ({}));

  if (slug[0] === "vendors") {
    if (!body.name) {
      return NextResponse.json({ error: "Vendor name is required" }, { status: 400 });
    }
    const now = new Date();
    const vendor: MockVendor = {
      id: newMockId("v"),
      name: body.name,
      company: body.company || null,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
      isActive: body.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    vendorsStore = [vendor, ...vendorsStore];
    return NextResponse.json({ success: true, data: vendor });
  }

  if (slug[0] === "pages") {
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }
    const now = new Date();
    const page: MockPage = {
      id: newMockId("pg"),
      title: body.title,
      slug: body.slug,
      content: body.content || null,
      status: body.status || "draft",
      isActive: body.isActive ?? body.status === "published",
      createdAt: now,
      updatedAt: now,
    };
    pagesStore = [page, ...pagesStore];
    return NextResponse.json({ success: true, data: page });
  }

  return NextResponse.json({
    success: true,
    message: "Action simulated successfully (Frontend Mock Mode)",
  });
}

export async function PUT() {
  return NextResponse.json({
    success: true,
    message: "Updated successfully (Frontend Mock Mode)",
  });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json().catch(() => ({}));

  if (slug[0] === "vendors" && slug[1]) {
    const idx = vendorsStore.findIndex((v) => v.id === slug[1]);
    if (idx === -1) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    vendorsStore[idx] = {
      ...vendorsStore[idx],
      ...body,
      id: vendorsStore[idx].id,
      createdAt: vendorsStore[idx].createdAt,
      updatedAt: new Date(),
    };
    return NextResponse.json({ success: true, data: vendorsStore[idx] });
  }

  if (slug[0] === "pages" && slug[1]) {
    const idx = pagesStore.findIndex((p) => p.id === slug[1]);
    if (idx === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    pagesStore[idx] = {
      ...pagesStore[idx],
      ...body,
      id: pagesStore[idx].id,
      createdAt: pagesStore[idx].createdAt,
      updatedAt: new Date(),
    };
    return NextResponse.json({ success: true, data: pagesStore[idx] });
  }

  return NextResponse.json({
    success: true,
    message: "Updated successfully (Frontend Mock Mode)",
  });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  if (slug[0] === "vendors" && slug[1]) {
    const before = vendorsStore.length;
    vendorsStore = vendorsStore.filter((v) => v.id !== slug[1]);
    if (vendorsStore.length === before) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  if (slug[0] === "pages" && slug[1]) {
    const before = pagesStore.length;
    pagesStore = pagesStore.filter((p) => p.id !== slug[1]);
    if (pagesStore.length === before) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({
    success: true,
    message: "Deleted successfully (Frontend Mock Mode)",
  });
}
