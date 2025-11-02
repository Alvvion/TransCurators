"use client";

import { addToCart, addToWishlist, removeFromCart } from "@/actions/products";
import { CartItem } from "@/app/(products)/cart/page";
import { AllProduct } from "@/app/(products)/shop/page";
import { Product } from "@/components/Banners/Deals";
import { startTransition } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export function getGuestSession() {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
}

export const handleAddToCart = (
  product: Product | CartItem | AllProduct,
  id: string,
  incrementCart: () => void,
  guest = "false"
) => {
  const formData = new FormData();
  formData.append("Id", product.Id);
  formData.append("title", product.title);
  formData.append("quantity", "1");
  formData.append("image", product.image);
  formData.append("price", product.price.toString());
  formData.append("userId", id);
  formData.append("guest", guest);
  startTransition(async () => {
    try {
      const result = await addToCart(formData);
      if (result.status) {
        toast.success(result.message!);
        if (result.increment) incrementCart();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  });
};

export const handleRemoveFromCart = (
  product: Product | CartItem,
  id: string,
  decrementCart: () => void,
  guest = "false"
) => {
  const formData = new FormData();
  formData.append("Id", product.Id);
  formData.append("userId", id);
  formData.append("guest", guest);
  startTransition(async () => {
    try {
      const result = await removeFromCart(formData);
      if (result.status) {
        toast.success(result.message!);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  });
};

export const handleAddToWishlist = (
  product: Product | CartItem | AllProduct,
  id: string,
  incrementWishlist: () => void,
  decrementWishlist: () => void,
  guest = "false"
) => {
  const formData = new FormData();
  formData.append("Id", product.Id);
  formData.append("title", product.title);
  formData.append("image", product.image);
  formData.append("price", product.price.toString());
  formData.append("userId", id);
  formData.append("guest", guest);
  startTransition(async () => {
    try {
      const result = await addToWishlist(formData);
      if (result.status) {
        toast.success(result.message!);
        if (result.removed) decrementWishlist();
        else incrementWishlist();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  });
};
