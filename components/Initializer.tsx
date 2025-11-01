"use client";

import { useEffect } from "react";
import { useCartStore, useUserStore, useWishlistStore } from "@/utils/store";
import { getProductCountAction, getUserAction } from "@/actions/actions";
import { getGuestSession } from "@/utils/clientFunctions";

export default function Initializer() {
  const setCartCount = useCartStore((state) => state.setCartCount);
  const setWishlistCount = useWishlistStore((state) => state.setWishlistCount);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchCartCount = async () => {
      const guestId = getGuestSession();
      const formData = new FormData();
      formData.append("guestId", guestId);
      const counter = await getProductCountAction(formData);
      const result = await getUserAction();
      if (!counter) return;
      setCartCount(counter.cartCount || 0);
      setWishlistCount(counter.wishlistCount || 0);

      if (result?.status) {
        setUser({
          id: result.user!.id,
          email: result.user!.email,
          name: result.user!.name,
        });
      } else {
        setUser({
          id: guestId,
          email: "",
          name: "Guest",
        });
      }
    };

    fetchCartCount();
  }, [setCartCount, setUser, setWishlistCount]);

  return null;
}
