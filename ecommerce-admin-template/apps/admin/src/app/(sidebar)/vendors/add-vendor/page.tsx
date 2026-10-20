import { Suspense } from "react";
import { VendorCreatePage } from "@/components/admin/vendor/vendor-create-page";

export const metadata = {
  title: "Create Vendor - eCommerce Admin",
  description: "Register a new partner store or vendor supplier in the catalog",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading form...</div>}>
      <VendorCreatePage />
    </Suspense>
  );
}
