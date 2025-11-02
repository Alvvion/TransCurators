/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useTransition } from "react";
import { StarIcon } from "lucide-react";
import { changeCartQunantity, getCart } from "@/actions/products";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCartStore, useUserStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { handleRemoveFromCart } from "@/utils/clientFunctions";

export type CartItem = {
  Id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type LocalQty = {
  itemId: string;
  quantity: number;
  itemizedTotal: number;
};

const Cart = () => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [localQty, setLocalQty] = useState<LocalQty[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const user = useUserStore((state) => state.user);
  const decrementCart = useCartStore((state) => state.decrementCart);
  const router = useRouter();

  const updateQuantity = (item: CartItem, increment: boolean) => {
    const formData = new FormData();
    formData.append("Id", item.Id);
    formData.append("userId", user.id);
    formData.append("guest", user.name === "Guest" ? "true" : "false");
    startTransition(async () => {
      const result = await changeCartQunantity(formData, increment);
      if (result.status) {
        setLocalQty((prev) => {
          const idx = prev.findIndex((q) => q.itemId === item.Id);
          if (idx === -1) {
            // not present yet -> create new optimistic entry
            const newQty = increment
              ? item.quantity + 1
              : Math.max(item.quantity - 1, 1);
            return [
              ...prev,
              {
                itemId: item.Id,
                quantity: newQty,
                itemizedTotal: newQty * item.price,
              },
            ];
          } else {
            // update existing
            return prev.map((q) =>
              q.itemId === item.Id
                ? {
                    ...q,
                    quantity: increment
                      ? q.quantity + 1
                      : Math.max(q.quantity - 1, 1),
                    itemizedTotal:
                      (increment
                        ? q.quantity + 1
                        : Math.max(q.quantity - 1, 1)) * item.price,
                  }
                : q
            );
          }
        });
        router.refresh();
      } else {
        console.error(result.error);
        toast.error("Failed to update cart. Please try again.");
        setLocalQty((prev) =>
          prev.map((q) =>
            q.itemId === item.Id
              ? {
                  ...q,
                  quantity: item.quantity,
                  itemizedTotal: item.quantity * item.price,
                }
              : q
          )
        );
      }
    });
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userId", user.id);
        formData.append("guest", user.name === "Guest" ? "true" : "false");
        const result = await getCart(formData);
        if (result.status) {
          setCartItem(result.cart);
          setLocalQty(
            result.cart.map((it: CartItem) => ({
              itemId: it.Id,
              quantity: it.quantity,
              itemizedTotal: it.price * it.quantity,
            }))
          );
          setSubTotal(result.total);
        }
      } catch (error) {
        console.error(error);
        toast.error("failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user.id, user.name]);

  useEffect(() => {
    if (localQty.length > 0) {
      const total = localQty.reduce((acc, curr) => acc + curr.itemizedTotal, 0);
      setSubTotal(Number(total.toFixed(2)));
    }
  }, [localQty]);

  return (
    <div>
      <div className="px-[8%] lg:px-[12%] bg-[#e6f9ef] py-5">
        <div className="w-full text-left">
          <h2 className="Unbounded text-2xl text-(--primary-color)">
            Shopping Cart
          </h2>
        </div>
      </div>
      <div className="px-[8%] lg:px-[12%] py-10">
        {loading || cartItem.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2">
            {loading ? "Cart is loading" : "Cart is empty"}
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white hidden lg:table">
                  <thead className="bg-(--primary-light)">
                    <tr>
                      <th className="Unbounded py-3 px-4 font-normal text-left">
                        Product
                      </th>
                      <th className="Unbounded py-3 px-4 font-normal text-left">
                        Price
                      </th>
                      <th className="Unbounded py-3 px-4 font-normal text-left">
                        Quantity
                      </th>
                      <th className="Unbounded py-3 px-4 font-normal text-left cursor-pointer">
                        Subtotal
                      </th>
                      <th className="Unbounded font-normal text-left cursor-pointer px-4">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.map((item: CartItem, index) => {
                      const localItem = localQty.find(
                        (q) => q.itemId === item.Id
                      );
                      const displayQty = localItem
                        ? localItem.quantity
                        : item.quantity;
                      const displayItemized = localItem
                        ? localItem.itemizedTotal
                        : Number(item.price * item.quantity).toFixed(2);
                      return (
                        <tr key={item.Id} className="border-b border-gray-300">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="object-contain "
                            />
                            <div className="flex flex-col">
                              <p className="Unbounded font-medium text-lg">
                                {item.title}
                              </p>
                              <span className="flex items-center text-base text-yellow-500">
                                <StarIcon className="fill-yellow-500 size-4" />
                                (17+)
                              </span>
                            </div>
                          </td>
                          <td className="Unbounded py-3 px-4">${item.price}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center border w-24 justify-around">
                              <button
                                onClick={() => updateQuantity(item, false)}
                                disabled={isPending}
                                className="flex text-lg cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-4">{displayQty}</span>
                              <button
                                onClick={() => updateQuantity(item, true)}
                                disabled={isPending}
                                className="flex text-lg cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="Unbounded py-3 px-4">
                            ${displayItemized}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                handleRemoveFromCart(
                                  item,
                                  user.id,
                                  decrementCart,
                                  user.name === "Guest" ? "true" : "false"
                                );
                                setCartItem((prev) =>
                                  prev.filter((p, i) => i !== index)
                                );
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center Unbounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                  {cartItem.map((item, index) => {
                    const localItem = localQty.find(
                      (q) => q.itemId === item.Id
                    );
                    const displayQty = localItem
                      ? localItem.quantity
                      : item.quantity;
                    const displayItemized = localItem
                      ? localItem.itemizedTotal
                      : Number(item.price * item.quantity).toFixed(2);
                    return (
                      <div
                        key={item.Id}
                        className="border border-gray-300 p-4 bg-white"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-contain "
                          />
                          <div>
                            <p className="Unbounded font-medium text-lg">
                              {item.title}
                            </p>
                            <span className="flex items-center text-sm text-yellow-500">
                              <StarIcon className="fill-yellow-500 size-4 me-1" />
                              (17+)
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="Unbounded text-sm my-4">
                              Price: {item.price}
                            </p>
                            <div className="flex items-center border w-24 justify-around">
                              <button
                                onClick={() => updateQuantity(item, false)}
                                disabled={isPending}
                                className="flex text-lg cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-4">{displayQty}</span>
                              <button
                                onClick={() => updateQuantity(item, true)}
                                disabled={isPending}
                                className="flex text-lg cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="Unbounded text-sm my-4">
                              {displayItemized}
                            </p>
                            <button
                              onClick={() => {
                                handleRemoveFromCart(
                                  item,
                                  user.id,
                                  decrementCart,
                                  user.name === "Guest" ? "true" : "false"
                                );
                                setCartItem((prev) =>
                                  prev.filter((p, i) => i !== index)
                                );
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center Unbounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/4 sticky h-full left-0">
              <div className="bg-(--primary-light) p-5 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Subtotal</span>
                  <span className="Unbounded">${subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Estimated Delivery</span>
                  <span className="Unbounded">Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Estimated Taxes</span>
                  <span className="Unbounded">$10</span>
                </div>
                <div className="flex justify-between mb-2 font-bold border-t border-gray-400 pt-2 text-lg">
                  <span className="Unbounded">Total</span>
                  <span className="Unbounded">
                    ${Number(subTotal + 10).toFixed(2)}
                  </span>
                </div>
                <Link
                  className="bg-(--primary-color) text-white font-semibold w-full py-3 hover:bg-black transition-colors cursor-pointer flex justify-center items-center"
                  href="/checkout"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
