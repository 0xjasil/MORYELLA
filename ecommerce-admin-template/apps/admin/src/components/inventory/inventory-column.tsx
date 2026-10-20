"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductWithRelations } from "./inventory-table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InventoryActionMenu } from "./inventory-action-menu";

export const inventoryColumns: ColumnDef<ProductWithRelations>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original as { image?: string | null };
      const image = product.image;
      return image ? (
        <Image
          src={image}
          alt="Product"
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
      ) : (
        <span className="text-muted-foreground">No image</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      const renderIcon = () => {
        if (!sort) return <ArrowUpDown className="size-4" />;
        if (sort === "asc") return <ArrowUp className="size-4" />;
        if (sort === "desc") return <ArrowDown className="size-4" />;
        return null;
      };

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(sort === "asc")}
        >
          Name
          {renderIcon()}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("name") as string}</span>
        <span className="text-xs text-muted-foreground">
          {((row.original as { sku?: string }).sku) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = (row.original as { description?: string | null }).description;
      const text = desc || "-";
      const truncated = text.length > 60 ? `${text.slice(0, 60)}…` : text;
      return <div className="max-w-sm text-muted-foreground">{truncated}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(String(row.getValue("price")));
      return <div className="font-medium">{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: "qty",
    header: "Stock",
    cell: ({ row }) => {
      const qty = row.original.qty;
      const isLowStock = row.original.isLowStock;
      return (
        <div className="flex items-center gap-2">
          <span className={qty > 0 ? "text-green-600 dark:text-green-400 font-semibold" : "text-red-600 dark:text-red-400 font-semibold"}>
            {qty}
          </span>
          {isLowStock && (
            <Badge variant="destructive" className="text-[10px] px-1 py-0">
              Low
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => row.original.category?.name || "-",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
    cell: ({ row }) => row.original.brand?.name || "-",
  },
  {
    accessorKey: "subCategory.name",
    header: "Subcategory",
    cell: ({ row }) => row.original.subCategory?.name || "-",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const qty = row.original.qty;
      if (qty <= 0) return <Badge variant="destructive">Out of Stock</Badge>;
      if (row.original.isLowStock) return <Badge variant="outline" className="text-orange-500 border-orange-500">Low Stock</Badge>;
      return <Badge variant="outline" className="text-green-500 border-green-500">In Stock</Badge>;
    },
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      return row.original && <InventoryActionMenu product={row.original as { id: string; name: string }} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
