"use client";

import { useState } from "react";
import Image from "next/image";
import products from "@/constants/Recommend.json";
import type { Product } from "../Banners/Deals";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import cn from "@/utils/cn";
import { useCartStore, useUserStore, useWishlistStore } from "@/utils/store";
import { handleAddToCart, handleAddToWishlist } from "@/utils/clientFunctions";

type SaleProduct = Product & {
  sale: string;
};

const Recommend = () => {
  const user = useUserStore((state) => state.user);
  const incrementCart = useCartStore((state) => state.incrementCart);
  const incrementWishlist = useWishlistStore(
    (state) => state.incrementWishlist
  );
  const decrementWishlist = useWishlistStore(
    (state) => state.decrementWishlist
  );

  const [wishlistedProduct, setWishlistedProduct] = useState(
    Array(products.length).fill(false)
  );

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10  w-full flex flex-col  lg:flex-row justify-between items-start gap-5">
        <h1 className="Unbounded text-5xl">Recommended for you</h1>
      </div>

      {/* Products */}
      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product: SaleProduct, i: number) => (
            <div
              key={product.Id}
              className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-(--primary-color) cursor-pointer duration-300"
            >
              <div className="relative flex justify-center items-center w-full h-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={180}
                  height={180}
                  className="object-contain mt-10"
                />
                <button
                  onClick={() => {
                    handleAddToWishlist(
                      product,
                      user.id,
                      incrementWishlist,
                      decrementWishlist,
                      user.name === "Guest" ? "true" : "false"
                    );
                    setWishlistedProduct((prev) => {
                      const updated = [...prev];
                      updated[i] = !updated[i];
                      return updated;
                    });
                  }}
                  className="absolute top-0 left-0 w-12 h-12 rounded-full text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-colors duration-300 flex justify-center items-center"
                >
                  <HeartIcon
                    className={cn(
                      "text-xl",
                      wishlistedProduct[i] && "fill-red-600 text-red-600"
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "absolute off-product top-0 right-0 px-4 py-2 Merienda text-xs font-bold text-white rounded-lg",
                    product.sale === "New"
                      ? "bg-yellow-400"
                      : product.sale.includes("%")
                      ? "bg-red-500"
                      : "hidden"
                  )}
                >
                  {product.sale}
                </span>
              </div>
              <Link
                href={{
                  pathname: "/shop",
                  query: { id: product.Id },
                }}
              >
                <div className="space-y-1 mt-5 product-info">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm line-through">
                      {product.lessprice}
                    </span>
                    <span className="text-xl font-semibold">
                      {product.price}
                    </span>
                    <span className="text-gray-500 text-sm">/Qty</span>
                  </div>
                </div>
                <span className="flex items-center text-yellow-500 text-base">
                  <StarIcon className="fill-yellow-500 me-1 size-4" />{" "}
                  {product.review}
                </span>
                <h2 className="Unbounded text-lg font-normal my-2 hover:text-(--primary-color) transition-all duration-300">
                  {product.title}
                </h2>
                <p className="Unbounded mt-2 text-sm text-gray-600">
                  Sold: {product.sold}
                </p>
              </Link>
              <button
                onClick={() =>
                  handleAddToCart(
                    product,
                    user.id,
                    incrementCart,
                    user.name === "Guest" ? "true" : "false"
                  )
                }
                className="w-full px-4 my-2 text-lg font-semibold text-(--primary-color) bg-(--primary-light) rounded-md hover:bg-(--primary-color) hover:text-white cursor-pointer transition-all flex justify-center items-center py-3"
              >
                Add to Cart <ShoppingCartIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
