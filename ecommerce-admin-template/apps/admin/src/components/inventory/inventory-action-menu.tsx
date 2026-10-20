"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpRight,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InventoryDeleteDialog } from "./inventory-delete-dialog";

interface InventoryActionMenuProps {
  product: { id: string; name: string };
}

export const InventoryActionMenu = ({ product }: InventoryActionMenuProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/inventory/${product.id}`);
  };

  const handleEditClick = () => {
    router.push(`/inventory/edit/${product.id}`);
  };

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleViewClick}>
            <ArrowUpRight className="size-4 mr-2" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={handleEditClick}>
            <Edit2 className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onSelect={handleDeleteClick}
          >
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InventoryDeleteDialog
        product={{ id: product.id, name: product.name }}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </div>
  );
};
