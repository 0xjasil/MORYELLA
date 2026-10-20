import { BrandDialogForm } from "@/components/brand/brand-dialog-from";
import BrandTable from "@/components/brand/brand-table";
import { Brand } from "@prisma/client";
import { brandColumns } from "@/components/brand/brand-columns";

import { mockBrands } from "@/lib/mock-data";

export default async function BrandPage() {
  let brands: Brand[] = mockBrands as unknown as Brand[];

  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
        cache: "no-store",
      });

      if (res.ok) {
        brands = await res.json();
      }
    } catch {
      // safely fallback to mock data
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Brands</h1>
              <p className="text-muted-foreground">Manage Brands</p>
            </div>
            <BrandDialogForm />
          </div>

          {/* Brand Table */}
          <BrandTable data={brands} columns={brandColumns} />
        </div>
      </div>
    </div>
  );
}
