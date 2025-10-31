/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Product } from "@/components/Banners/Deals";
import { StarIcon } from "lucide-react";
import Link from "next/link";

type CartItem = Product & {
  qty?: number;
};

const Cart = () => {
  const [cartItem, setCartItem] = useState<CartItem[]>([
    {
      Id: "BestDeals1",
      image: "/BestDeals/product-img1.png",
      title: "Fresh Eggplant & Cucumber Mix",
      price: "$14.99",
      lessprice: "$28.99",
      review: "(17k)",
      sold: "18/35",
    },
    {
      Id: "BestDeals2",
      image: "/BestDeals/product-img2.png",
      title: "Organic Beets with Greens",
      price: "$12.99",
      lessprice: "$22.99",
      review: "(12k)",
      sold: "22/40",
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);

  //   const handleSubTotal = useCallback(() => {
  //     const total = cartItem.reduce((acc: number, item: CartItem) => {
  //       const quantity = item.qty ?? 1;
  //       const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
  //       return acc + priceNum * quantity;
  //     }, 0);
  //     setSubTotal(total);
  //   }, [cartItem]);

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
        {cartItem.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2">Your Wishlist is empty</p>
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
                    {cartItem.map((item: CartItem) => {
                      const quantity = item.qty ?? 1;
                      const priceNum =
                        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                      const itemSubtotal = priceNum * quantity;
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
                                {item.review}
                              </span>
                            </div>
                          </td>
                          <td className="Unbounded py-3 px-4">${priceNum}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center border w-24 justify-around">
                              <button className="flex text-lg cursor-pointer">
                                -
                              </button>
                              <span className="px-4">{quantity}</span>
                              <button className="flex text-lg cursor-pointer">
                                +
                              </button>
                            </div>
                          </td>
                          <td className="Unbounded py-3 px-4">
                            ${itemSubtotal}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center Unbounded">
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
                  {cartItem.map((item) => (
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
                            {item.review}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="Unbounded text-sm my-4">
                            Price: {item.price}
                          </p>
                          <div className="flex items-center border w-24 justify-around">
                            <button className="flex text-lg cursor-pointer">
                              -
                            </button>
                            <span className="px-4">1</span>
                            <button className="flex text-lg cursor-pointer">
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="Unbounded text-sm my-4">{item.price}</p>
                          <button className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center Unbounded">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/4 sticky h-full left-0">
              <div className="bg-(--primary-light) p-5 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Subtotal</span>
                  <span className="Unbounded">$123</span>
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
                  <span className="Unbounded">$150</span>
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
