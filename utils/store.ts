import { create } from "zustand";

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
