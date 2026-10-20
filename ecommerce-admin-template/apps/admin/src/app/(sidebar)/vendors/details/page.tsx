import { Suspense } from "react";
import { VendorDetailsPage } from "@/components/admin/vendor/vendor-details-page";

export const metadata = {
  title: "Vendor Details - eCommerce Admin",
  description: "View vendor performance, products, sales analytics, and contact credentials",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading vendor details...</div>}>
      <VendorDetailsPage />
    </Suspense>
  );
}
