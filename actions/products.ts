"use server";

import Cart from "@/models/CartSchema";
import Wishlist from "@/models/WishlistSchena";
import { dbConnect } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function addToCart(formData: FormData) {
  const product = {
    Id: formData.get("Id")?.toString(),
    title: formData.get("title")?.toString(),
    price:
      parseFloat(
        (formData.get("price")?.toString() || "0").replace(/[^0-9.-]+/g, "")
      ) || 0,
    quantity: parseInt(formData.get("quantity")?.toString() || "1"),
    image: formData.get("image")?.toString(),
    guest: formData.get("guest")?.toString() === "true" ? true : false,
    userId: formData.get("userId")?.toString(),
  };

  let increment = false;

  try {
    if (!product.Id || !product.title || !product.image || !product.price) {
      throw new Error("Something wrong with the product");
    }

    if (!product.userId) {
      throw new Error("Missing userId");
    }

    const query = product.guest
      ? { guestId: product.userId }
      : { user: product.userId };

    await dbConnect();

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({
        user: product.guest ? undefined : product.userId,
        guestId: product.guest ? product.userId : undefined,
        products: [
          {
            Id: product.Id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            image: product.image,
          },
        ],
        totalPrice: 0,
      });
      increment = true;
    } else {
      const existingProduct = cart.products.find(
        (p: typeof product) => p.Id === product.Id
      );
      if (existingProduct) {
        // Increment quantity
        existingProduct.quantity += 1;
        increment = false;
      } else {
        // Add new product
        cart.products.push({
          Id: product.Id,
          title: product.title,
          image: product.image,
          quantity: 1,
          price: product.price,
        });
        increment = true;
      }
    }

    cart.totalPrice = cart.products.reduce(
      (sum: number, p: typeof product) => sum + p.price * p.quantity,
      0
    );
    await cart.save();
    revalidatePath("/cart");

    return {
      status: true,
      message: `${product.title} added to Cart`,
      increment,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load cart",
      increment: false,
    };
  }
}

export async function removeFromCart(formData: FormData) {
  const productId = formData.get("Id")?.toString();
  const userId = formData.get("userId")?.toString();
  const guest = formData.get("guest")?.toString() === "true" ? true : false;

  try {
    if (!userId) {
      throw new Error("Missing userId");
    }
    const query = guest ? { guestId: userId } : { user: userId };
    await dbConnect();
    const cart = await Cart.findOne(query);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.products.findIndex(
      (p: { Id: string }) => p.Id === productId
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.products.splice(productIndex, 1);

    cart.totalPrice = cart.products.reduce(
      (sum: number, p: { price: number; quantity: number }) =>
        sum + p.price * p.quantity,
      0
    );

    await cart.save();
    revalidatePath("/cart");
    return {
      status: true,
      message: "Item removed from the cart",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load cart",
    };
  }
}

export async function addToWishlist(formData: FormData) {
  const product = {
    Id: formData.get("Id")?.toString(),
    title: formData.get("title")?.toString(),
    price:
      parseFloat(
        (formData.get("price")?.toString() || "0").replace(/[^0-9.-]+/g, "")
      ) || 0,
    image: formData.get("image")?.toString(),
    guest: formData.get("guest")?.toString() === "true" ? true : false,
    userId: formData.get("userId")?.toString(),
  };

  try {
    if (!product.userId) {
      throw new Error("Missing userId");
    }
    let removed = false;
    if (!product.Id) {
      throw new Error("Something wrong with the product");
    }

    const query = product.guest
      ? { guestId: product.userId }
      : { user: product.userId };

    await dbConnect();
    let wishlist = await Wishlist.findOne(query);

    if (!wishlist) {
      if (!product.title || !product.image || !product.price) {
        throw new Error("Something wrong with the product");
      }
      wishlist = new Wishlist({
        user: product.guest ? undefined : product.userId,
        guestId: product.guest ? product.userId : undefined,
        products: [
          {
            Id: product.Id,
            title: product.title,
            price: product.price,
            image: product.image,
          },
        ],
      });
    } else {
      const productIndex = wishlist.products.findIndex(
        (p: { Id: string }) => p.Id === product.Id
      );
      if (productIndex !== -1) {
        // Delete product
        wishlist.products.splice(productIndex, 1);
        removed = true;
      } else {
        // Add new product
        if (!product.title || !product.image || !product.price) {
          throw new Error("Something wrong with the product");
        }
        wishlist.products.push({
          Id: product.Id,
          title: product.title,
          image: product.image,
          price: product.price,
        });
      }
    }
    await wishlist.save();
    revalidatePath("/wishlist");

    return {
      status: true,
      message: `${product.title || "Product"} added ${
        removed ? "removed" : "added"
      }`,
      removed,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load wishlist",
    };
  }
}

export async function getProductCount(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const guestId = formData.get("guestId")?.toString();

  try {
    const query = userId ? { user: userId } : { guestId: guestId };
    await dbConnect();
    const cart = await Cart.findOne(query);
    const wishlist = await Wishlist.findOne(query);
    const counter = { cartCount: 0, wishlistCount: 0 };
    if (cart) counter.cartCount = cart.products.length;
    if (wishlist) counter.wishlistCount = wishlist.products.length;
    return {
      status: true,
      counter,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load data",
    };
  }
}

export async function getCart(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const guest = formData.get("guest")?.toString() === "true" ? true : false;
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }
    const query = guest ? { guestId: userId } : { user: userId };
    await dbConnect();
    const cart = await Cart.findOne(query);

    if (!cart) {
      throw new Error("Cart not found");
    }

    return {
      status: true,
      cart: JSON.parse(JSON.stringify(cart.products)),
      total: cart.totalPrice,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load cart",
    };
  }
}

export async function getWishlist(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const guest = formData.get("guest")?.toString() === "true" ? true : false;
  try {
    if (!userId) {
      throw new Error("Missing userId");
    }
    const query = guest ? { guestId: userId } : { user: userId };
    await dbConnect();
    const wishlist = await Wishlist.findOne(query);

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    return {
      status: true,
      wishlist: JSON.parse(JSON.stringify(wishlist.products)),
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load wishlist",
    };
  }
}

export async function changeCartQunantity(
  formData: FormData,
  increment: boolean
) {
  const productId = formData.get("Id")?.toString();
  const userId = formData.get("userId")?.toString();
  const guest = formData.get("guest")?.toString() === "true" ? true : false;

  try {
    if (!userId) {
      throw new Error("Missing userId");
    }
    const query = guest ? { guestId: userId } : { user: userId };
    await dbConnect();
    const cart = await Cart.findOne(query);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingProduct = cart.products.find(
      (p: { Id: string }) => p.Id === productId
    );
    if (!existingProduct) throw new Error("No Product found");

    if (increment) {
      existingProduct.quantity += 1;
    } else {
      existingProduct.quantity = Math.max(1, existingProduct.quantity - 1);
    }

    cart.totalPrice = cart.products.reduce(
      (sum: number, p: { price: number; quantity: number }) =>
        sum + p.price * p.quantity,
      0
    );

    await cart.save();
    revalidatePath("/cart");
    return {
      status: true,
      quantity: existingProduct.quantity,
      total: cart.totalPrice,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: error instanceof Error ? error.message : "Unable to load cart",
    };
  }
}
