"use client";

import { Product, Brand, Category } from "@prisma/client";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  RowSelectionState,
} from "@tanstack/react-table";
import type { Table as TanStackTable } from "@tanstack/react-table";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, X, RefreshCw, Package } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Checkbox from "../ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/api-client";
import { BatchUpdateDialog } from "./batch-update-dialog";

export type ProductWithRelations = (Product & {
  brand: { id: string; name: string } | null;
  category: { id: string; name: string } | null;
  subCategory: { id: string; name: string } | null;
}) & {
  sku: string;
  options?: string;
  price: number;
  qty: number;
  isLowStock: boolean;
  image?: string | null;
  description?: string | null;
  createdAt?: Date | string;
};

interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

interface ProductsResponse {
  data: ProductWithRelations[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    sortBy: string;
    sortOrder: string;
  };
}

interface InvenotryTableProps {
  columns: ColumnDef<ProductWithRelations>[];
  categories?: Category[];
  brands?: Brand[];
  onSelectionChange?: (selectedProducts: ProductWithRelations[]) => void;
}

const sortOptions = [
  { value: "created_desc", label: "Newest First", sortBy: "createdAt", sortOrder: "desc" },
  { value: "created_asc", label: "Oldest First", sortBy: "createdAt", sortOrder: "asc" },
  { value: "name_asc", label: "Name A-Z", sortBy: "name", sortOrder: "asc" },
  { value: "name_desc", label: "Name Z-A", sortBy: "name", sortOrder: "desc" },
  { value: "price_asc", label: "Price Low to High", sortBy: "price", sortOrder: "asc" },
  { value: "price_desc", label: "Price High to Low", sortBy: "price", sortOrder: "desc" },
  { value: "stock_asc", label: "Stock Low to High", sortBy: "qty", sortOrder: "asc" },
  { value: "stock_desc", label: "Stock High to Low", sortBy: "qty", sortOrder: "desc" },
];

export default function InventoryTable({
  columns,
  categories = [],
  brands = [],
  onSelectionChange,
}: InvenotryTableProps) {
  const [data, setData] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedProducts, setSelectedProducts] = useState<ProductWithRelations[]>([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("created_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [showFilters, setShowFilters] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    pageSize: 10,
  });

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const tableRef = useRef<TanStackTable<ProductWithRelations> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const columnsWithSelection = useMemo<ColumnDef<ProductWithRelations>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
  ], [columns]);

  useEffect(() => {
    const selectedRows = tableRef.current?.getFilteredSelectedRowModel().rows || [];
    const newSelectedProducts = selectedRows.map((row) => row.original);
    setSelectedProducts(newSelectedProducts);
    onSelectionChange?.(newSelectedProducts);
  }, [rowSelection, data, onSelectionChange]);

  const fetchSubCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/subcategories`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json)
          ? json
          : ((json as { data?: SubCategory[] }).data || []);
        setSubCategories(list);
      }
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: pageSize.toString(),
    });

    const activeSort = sortOptions.find((o) => o.value === sortBy);
    if (activeSort) {
      params.append("sortBy", activeSort.sortBy);
      params.append("sortOrder", activeSort.sortOrder);
    }

    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedCategory !== "all") params.append("categoryId", selectedCategory);
    if (selectedSubCategory !== "all") params.append("subCategoryId", selectedSubCategory);
    if (selectedBrand !== "all") params.append("brandId", selectedBrand);

    return params.toString();
  }, [currentPage, pageSize, sortBy, debouncedSearch, selectedCategory, selectedSubCategory, selectedBrand]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/inventory?${buildQueryParams()}`, {
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result: ProductsResponse = await response.json();
      setData(result.data);
      setPagination({
        currentPage: result.meta.page,
        totalPages: result.meta.totalPages,
        total: result.meta.total,
        pageSize: result.meta.pageSize,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch inventory");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams]);

  useEffect(() => {
    const handler = () => {
      fetchProducts();
    };
    window.addEventListener("inventory:updated", handler);
    return () => window.removeEventListener("inventory:updated", handler);
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, selectedSubCategory, selectedBrand, sortBy]);

  useEffect(() => {
    if (selectedCategory !== "all") {
      setSelectedSubCategory("all");
    }
  }, [selectedCategory]);

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    pageCount: pagination.totalPages,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      sorting: [],
      rowSelection,
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex: currentPage - 1, pageSize }) : updater;
      setCurrentPage(next.pageIndex + 1);
      setPageSize(next.pageSize);
    },
    onSortingChange: () => {},
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    enableRowSelection: true,
    getRowId: (row) => row.id,
  });

  tableRef.current = table;

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "all" : value);
    if (value !== "all") {
      setSelectedSubCategory("all");
    }
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value === "all" ? "all" : value);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value === "all" ? "all" : value);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSelectedBrand("all");
    setSearch("");
    setSortBy("created_desc");
  };

  const hasActiveFilters =
    debouncedSearch !== "" || selectedCategory !== "all" || selectedSubCategory !== "all" || selectedBrand !== "all";

  const filteredSubCategories = useMemo(() => {
    if (selectedCategory === "all") return subCategories;
    return subCategories.filter((sc) => sc.categoryId === selectedCategory);
  }, [subCategories, selectedCategory]);

  const selectedCount = selectedProducts.length;

  const handleBatchUpdateSuccess = () => {
    fetchProducts();
    handleClearSelection();
  };

  const handleClearSelection = () => {
    setRowSelection({});
    setSelectedProducts([]);
  };

  const handleRemoveFromSelection = (productId: string) => {
    setRowSelection((prev) => {
      const newSelection = { ...prev };
      delete newSelection[productId];
      return newSelection;
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
              <p className="text-muted-foreground">Manage Inventory</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="hidden sm:flex"
            >
              <Package className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Search & Filters</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        {[debouncedSearch, selectedCategory, selectedSubCategory, selectedBrand].filter(Boolean).filter((v) => v !== "all").length}
                      </Badge>
                    )}
                  </Button>
                </div>
                <CardDescription>Search and filter inventory items</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or SKU"
                    className="pl-8"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchProducts}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {loading ? "Refreshing..." : "Refresh"}
                </Button>
              </div>

              {showFilters && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filters</h4>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category ({categories.length} available)</label>
                      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subcategory ({filteredSubCategories.length} available)</label>
                      <Select value={selectedSubCategory} onValueChange={handleSubCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Subcategories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subcategories</SelectItem>
                          {filteredSubCategories.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Brand ({brands.length} available)</label>
                      <Select value={selectedBrand} onValueChange={handleBrandChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Brands</SelectItem>
                          {brands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-destructive">Error loading inventory: {error}</span>
                  <Button onClick={fetchProducts} variant="outline" className="ml-2">
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                All Inventory
                {selectedCount > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    {selectedCount} selected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {loading ? (
                  "Loading inventory..."
                ) : error ? (
                  <span className="text-destructive">{error}</span>
                ) : (
                  `Showing ${data.length} of ${pagination.total} products`
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {loading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                )}

                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className={row.getIsSelected() ? "bg-blue-50 dark:bg-blue-950/20" : ""}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columnsWithSelection.length} className="h-24 text-center">
                          No results found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={handlePageSizeChange}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pageSize.toString()} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      className="hidden h-8 w-8 p-0 lg:flex"
                      onClick={() => handlePageChange(1)}
                      disabled={!table.getCanPreviousPage() || loading}
                    >
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!table.getCanPreviousPage() || loading}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!table.getCanNextPage() || loading}
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="hidden h-8 w-8 p-0 lg:flex"
                      onClick={() => handlePageChange(pagination.totalPages)}
                      disabled={!table.getCanNextPage() || loading}
                    >
                      <span className="sr-only">Go to last page</span>
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedCount > 0 && (
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <CardTitle>
                      Selected Items ({selectedCount})
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <BatchUpdateDialog
                      selectedProducts={selectedProducts}
                      onSuccess={handleBatchUpdateSuccess}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearSelection}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {selectedProducts.map((product) => (
                    <Badge
                      key={product.id}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      <span className="max-w-32 truncate">{product.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => handleRemoveFromSelection(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
