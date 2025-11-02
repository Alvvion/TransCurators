import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  decrementCart: () => void;
  resetCart: () => void;
};

type WishlistState = {
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
  incrementWishlist: () => void;
  decrementWishlist: () => void;
  resetWishlist: () => void;
};

type UserState = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  setUser: (user: { id: string; email: string; name: string }) => void;
  clearUser: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCart: () =>
    set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
  resetCart: () => set({ cartCount: 0 }),
}));

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistCount: 0,
  setWishlistCount: (count) => set({ wishlistCount: count }),
  incrementWishlist: () =>
    set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
  decrementWishlist: () =>
    set((state) => ({ wishlistCount: Math.max(0, state.wishlistCount - 1) })),
  resetWishlist: () => set({ wishlistCount: 0 }),
}));

export const useUserStore = create<UserState>((set) => ({
  user: { id: "", email: "", name: "" },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { id: "", email: "", name: "" } }),
}));

export interface WishlistProduct {
  itemId: string;
  wishlisted: boolean;
}

interface WishlistHeartState {
  wishlist: WishlistProduct[];
  incrementWishlist: () => void;
  decrementWishlist: () => void;
  toggleWishlist: (id: string) => void;
}

export const useWishlistHeartStore = create<WishlistHeartState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      incrementWishlist: () => {
        // Optional if you're tracking count separately
      },
      decrementWishlist: () => {
        // Optional if you're tracking count separately
      },
      toggleWishlist: (id) => {
        const prev = get().wishlist;
        const exists = prev.find((p) => p.itemId === id);

        if (exists) {
          // Toggle the existing one
          set({
            wishlist: prev.map((p) =>
              p.itemId === id ? { ...p, wishlisted: !p.wishlisted } : p
            ),
          });
        } else {
          // Add new item as wishlisted
          set({ wishlist: [...prev, { itemId: id, wishlisted: true }] });
        }
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
