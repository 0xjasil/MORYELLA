import OrderDetail from "@/components/admin/order/order-detail-page"; 
import { API_URL } from "@/lib/api-client";
import { cookies } from "next/headers";

import { mockOrders } from "@/lib/mock-data";

import { Metadata } from "next";
import { OrderDetailed } from "@/types/order";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id} Details - Commerce Admin`,
    description: `View full order details, tracking activity, and customer information for order ${id}.`,
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();

      const response = await fetch(`${API_URL}/orders/${id}`, {
        cache: 'no-store',
        headers: {
          cookie: cookieHeader,
        }
      });
      const res = await response.json();
      const orderData = res.data || res;

      if (response.ok && orderData) {
        return <OrderDetail order={orderData} />;
      }
    } catch {
      // fallback to mock order below
    }
  }

  const mockOrder = mockOrders.find((o) => o.id === id) || mockOrders[0];
  if (mockOrder) {
    return <OrderDetail order={mockOrder as unknown as OrderDetailed} />;
  }

  return <div className="p-6 text-red-500">Order not found</div>;
}