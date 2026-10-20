'use client';

import { Vendor } from "@prisma/client";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DeleteVendorDialog } from "./delete-vendor-dialog";
import { VendorDialogForm } from "./vendor-dialog-form";

function ActionCell({ row }: { row: Row<Vendor> }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const vendor = row.original;

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
            <Edit className="mr-2 size-4" />
            Edit Vendor
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onSelect={() => setOpenDelete(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete Vendor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEdit && (
        <VendorDialogForm
          vendor={vendor}
          open={openEdit}
          onOpenChange={setOpenEdit}
        />
      )}

      <DeleteVendorDialog
        open={openDelete}
        setOpen={setOpenDelete}
        vendor={vendor}
      />
    </div>
  );
}

function SortableHeader({ column, label }: { column: Column<Vendor>; label: string }) {
  const sort = column.getIsSorted();
  const renderIcon = () => {
    if (!sort) return <ArrowUpDown />;
    if (sort === "asc") return <ArrowUp />;
    if (sort === "desc") return <ArrowDown />;
  };
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(sort === "asc")}
    >
      {label} {renderIcon()}
    </Button>
  );
}

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
    cell: ({ row }) => (
      <div className="px-4 py-2 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => <SortableHeader column={column} label="Company" />,
    cell: ({ row }) => (
      <div className="px-4 py-2">
        {row.getValue("company") ? (
          row.getValue("company")
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="px-4 py-2">
        {row.getValue("email") ? (
          row.getValue("email")
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="px-4 py-2">
        {row.getValue("phone") ? (
          row.getValue("phone")
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return isActive ? (
        <Badge className="bg-green-600 hover:bg-green-700 text-white flex items-center w-fit gap-1 font-medium">
          Active
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center w-fit gap-1 font-medium"
        >
          Inactive
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: (props) => <ActionCell row={props.row} />,
  },
];
