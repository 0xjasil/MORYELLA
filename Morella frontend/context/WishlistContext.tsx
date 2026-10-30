import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { type Product } from "@/components/ProductCard";

/* ── Types ────────────────────────────────────────────────────── */
interface WishlistState { ids: Set<string>; products: Product[]; }
type WishlistAction =
  | { type: "TOGGLE";   product: Product }
  | { type: "HYDRATE";  ids: string[]; products: Product[] };

export interface WishlistContextValue {
  products: Product[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  wishlistCount: number;
}

const STORAGE_KEY = "moryelle_wishlist_v1";

/* ── Reducer ──────────────────────────────────────────────────── */
function reducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { ids: new Set(action.ids), products: action.products };

    case "TOGGLE": {
      const newIds = new Set(state.ids);
      let newProducts = [...state.products];
      if (newIds.has(action.product.id)) {
        newIds.delete(action.product.id);
        newProducts = newProducts.filter(p => p.id !== action.product.id);
      } else {
        newIds.add(action.product.id);
        newProducts.push(action.product);
      }
      return { ids: newIds, products: newProducts };
    }

    default:
      return state;
  }
}

/* ── Context ──────────────────────────────────────────────────── */
const WishlistContext = createContext<WishlistContextValue | null>(null);

/* ── Provider ─────────────────────────────────────────────────── */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { ids: new Set<string>(), products: [] });

  /* Hydrate from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { ids, products } = JSON.parse(raw) as { ids: string[]; products: Product[] };
        if (Array.isArray(ids) && Array.isArray(products)) {
          dispatch({ type: "HYDRATE", ids, products });
        }
      }
    } catch { /* ignore */ }
  }, []);

  /* Persist */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ids:      Array.from(state.ids),
        products: state.products,
      }));
    } catch { /* ignore */ }
  }, [state.ids, state.products]);

  const toggleWishlist = useCallback((product: Product) =>
    dispatch({ type: "TOGGLE", product }), []);

  const isWishlisted = useCallback((id: string) => state.ids.has(id), [state.ids]);

  return (
    <WishlistContext.Provider value={{
      products: state.products,
      isWishlisted,
      toggleWishlist,
      wishlistCount: state.ids.size,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

/* ── Hook ─────────────────────────────────────────────────────── */
export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
