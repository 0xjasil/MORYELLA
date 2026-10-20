import initialVendors from "./vendors.json";

export interface VendorRecentProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  image: string;
}

export interface VendorItem {
  id: string;
  name: string;
  company: string;
  category: string;
  email: string;
  phone: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  productsCount: number;
  rating: number;
  status: "Active" | "Pending" | "Inactive";
  revenue: number;
  ordersCount: number;
  satisfaction: string;
  isVerified: boolean;
  isFeatured: boolean;
  memberSince: string;
  lastActive: string;
  logo: string;
  about: string;
  categories: string[];
  recentProducts: VendorRecentProduct[];
}

const LOCAL_STORAGE_KEY = "ecommerce_admin_vendors_v1";

export function getStoredVendors(): VendorItem[] {
  if (typeof window === "undefined") {
    return initialVendors as VendorItem[];
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialVendors));
      return initialVendors as VendorItem[];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialVendors as VendorItem[];
  } catch {
    return initialVendors as VendorItem[];
  }
}

export function saveVendorsList(vendors: VendorItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vendors));
    window.dispatchEvent(new CustomEvent("vendors:updated", { detail: vendors }));
  } catch (err) {
    console.error("Failed to persist vendors to localStorage", err);
  }
}

export function getVendorById(id: string): VendorItem | undefined {
  const vendors = getStoredVendors();
  return vendors.find((v) => v.id === id || v.id.toLowerCase() === id.toLowerCase());
}

export function addVendor(newVendor: Omit<VendorItem, "id">): VendorItem {
  const vendors = getStoredVendors();
  const id = `ven-${Date.now()}`;
  const created: VendorItem = {
    ...newVendor,
    id,
  };
  const updated = [created, ...vendors];
  saveVendorsList(updated);
  return created;
}

export function updateVendor(id: string, updates: Partial<VendorItem>): VendorItem | null {
  const vendors = getStoredVendors();
  const index = vendors.findIndex((v) => v.id === id);
  if (index === -1) return null;

  const updatedVendor = {
    ...vendors[index],
    ...updates,
  };
  vendors[index] = updatedVendor;
  saveVendorsList(vendors);
  return updatedVendor;
}

export function deleteVendor(id: string): boolean {
  const vendors = getStoredVendors();
  const filtered = vendors.filter((v) => v.id !== id);
  if (filtered.length === vendors.length) return false;
  saveVendorsList(filtered);
  return true;
}
