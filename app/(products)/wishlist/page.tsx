/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Product } from "@/components/Banners/Deals";
import { ShoppingCartIcon, StarIcon, XIcon } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  return (
    <div>
      <div className="px-[8%] lg:px-[12%] bg-[#e6f9ef] py-5">
        <div className="w-full text-left">
          <h2 className="Unbounded text-2xl text-(--primary-color)">
            Wishlist
          </h2>
        </div>
      </div>
      <div className="px-[8%] lg:px-[12%] py-10">
        {wishlistItems.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2">Your Wishlist is empty</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              {/* Desktop List */}
              <table className="min-w-full border border-gray-300 hidden lg:table">
                <thead className="bg-(--primary-light)">
                  <tr>
                    <th className="Unbounded py-3 px-4 border-r border-gray-300 font-normal text-left">
                      Product
                    </th>
                    <th className="Unbounded py-3 px-4 border-r border-gray-300 font-normal text-left">
                      Price
                    </th>
                    <th className="Unbounded py-3 px-4 border-r border-gray-300 font-normal text-left">
                      Stock Status
                    </th>
                    <th className="Unbounded py-3 px-4 border-r border-gray-300 font-normal text-left cursor-pointer">
                      Add to Cart
                    </th>
                    <th className="Unbounded font-normal text-left cursor-pointer px-4">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item) => (
                    <tr key={item.Id} className="border-b border-gray-300">
                      <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-300">
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
                      <td className="Unbounded py-3 px-4 border-r border-gray-300">
                        {item.price}
                      </td>
                      <td className="Unbounded py-3 px-4 border-r border-gray-300">
                        In Stock
                      </td>
                      <td className="px-4 border-r border-gray-300">
                        <button className="w-full px-4 py-2 my-2 text-lg font-semibold text-(--primary-color) bg-(--primary-light) rounded-md hover:bg-(--primary-color) hover:text-white transition-colors duration-300 flex justify-center items-center">
                          Add to Cart
                          <ShoppingCartIcon />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center">
                          <XIcon /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile List */}
              <div className="lg:hidden space-y-4">
                {wishlistItems.map((item) => (
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
                        <button className="flex justify-center items-center px-4 py-2 text-sm font-semibold text-(--primary-color) bg-(--primary-light) hover:bg-(--primary-color) hover:text-white transition-colors duration-300">
                          Add to Cart
                          <ShoppingCartIcon />
                        </button>
                      </div>
                      <div>
                        <p className="Unbounded text-sm my-4">
                          Status: In Stock
                        </p>
                        <button className="text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center">
                          <XIcon /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
