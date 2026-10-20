import { CategoryDialogForm } from "@/components/category/category-dialog-form";
import CategoryTable from "@/components/category/category-table";
import { Category } from "@prisma/client";
import { categoryColumns } from "@/components/category/category-columns";

import { mockCategories } from "@/lib/mock-data";

export default async function CategoriesPage() {
  let categories: Category[] = mockCategories as unknown as Category[];

  if (process.env.NEXT_PUBLIC_API_URL) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        cache: "no-store",
      });

      if (res.ok) {
        categories = await res.json();
      }
    } catch {
      // safely fallback to mock data
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="container flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
              <p className="text-muted-foreground">Manage all categories</p>
            </div>
            <CategoryDialogForm />
          </div>

          {/* Categories Table */}
          <CategoryTable data={Array.isArray(categories) ? categories : []} columns={categoryColumns} />
        </div>
      </div>
    </div>
  );
}
