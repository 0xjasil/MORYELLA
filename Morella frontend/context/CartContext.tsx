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
export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD";    product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE"; productId: string; delta: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

/* ── Storage key ──────────────────────────────────────────────── */
const STORAGE_KEY = "moryelle_cart_v1";

/* ── Reducer ──────────────────────────────────────────────────── */
function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD": {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) {
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, qty: 1 }] };
    }

    case "REMOVE":
      return { items: state.items.filter(i => i.product.id !== action.productId) };

    case "UPDATE": {
      const next = state.items
        .map(i => {
          if (i.product.id !== action.productId) return i;
          const newQty = i.qty + action.delta;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        })
        .filter(Boolean) as CartItem[];
      return { items: next };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

/* ── Derived helpers ──────────────────────────────────────────── */
function deriveCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}
function deriveTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.product.price * i.qty, 0);
}

/* ── Context ──────────────────────────────────────────────────── */
const CartContext = createContext<CartContextValue | null>(null);

/* ── Provider ─────────────────────────────────────────────────── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  /* Hydrate from localStorage on mount (client only) */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      /* silently ignore corrupt storage */
    }
  }, []);

  /* Persist to localStorage on every change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* silently ignore storage quota errors */
    }
  }, [state.items]);

  const addItem    = useCallback((product: Product) => dispatch({ type: "ADD", product }), []);
  const removeItem = useCallback((productId: string) => dispatch({ type: "REMOVE", productId }), []);
  const updateQty  = useCallback((productId: string, delta: number) => dispatch({ type: "UPDATE", productId, delta }), []);
  const clearCart  = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value: CartContextValue = {
    items:     state.items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    itemCount: deriveCount(state.items),
    total:     deriveTotal(state.items),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ── Hook ─────────────────────────────────────────────────────── */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
