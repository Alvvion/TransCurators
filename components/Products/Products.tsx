"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import Link from "next/link";

import type { AllProduct } from "@/app/(products)/shop/page";
import cn from "@/utils/cn";

type ProductsProps = {
  products: AllProduct[];
};

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [price, setPrice] = useState(100);
  const [discount50, setDiscount50] = useState(false);
  const [discount30, setDiscount30] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [filteredProducts, setFilteredProducts] =
    useState<AllProduct[]>(products);

  const computedFiltered = useMemo(() => {
    return products.filter((p) => {
      const productPrice = parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
      if (productPrice > price) return false;
      if (discount50 && !p.sale?.includes("50%")) return false;
      if (discount30 && !p.sale?.includes("30%")) return false;
      if (isNew && p.sale !== "New") return false;
      return true;
    });
  }, [products, price, discount50, discount30, isNew]);

  useEffect(() => {
    Promise.resolve().then(() => setFilteredProducts(computedFiltered));
  }, [computedFiltered]);

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="py-10">
        <div className="flex flex-col md:flex-row justify-between gap-5 relative">
          {/* Sidebar */}
          <div className="w-full md:w-1/2 lg:w-1/3 relative md:sticky md:top-28 left-0 h-full">
            <div className="border border-gray-300 shadow p-3">
              <div className="border-b w-full border-gray-300 pb-3 flex items-center justify-between">
                <h2 className="text-xl Unbounded">Product Category</h2>
                <button
                  onClick={() => setFilteredProducts(products)}
                  className="border border-gray-300 px-2 py-1 cursor-pointer hover:border-gray-500 transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm font-medium">$0</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full accent-(--primary-color)"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    $100
                  </span>
                </div>
              </div>
              {/* Discount */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Discount</h3>
                <form className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={discount50}
                      onChange={() => setDiscount50((prev) => !prev)}
                    />
                    <span>50% Off</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={discount30}
                      onChange={() => setDiscount30((prev) => !prev)}
                    />
                    <span>30% Off</span>
                  </label>
                </form>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Other</h3>
                <form className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={() => setIsNew((prev) => !prev)}
                    />
                    <span>New Arrival</span>
                  </label>
                </form>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:mt-0 mt-20">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                    <button className="absolute top-0 left-0 w-12 h-12 rounded-full text-(--primary-color) hover:bg-(--primary-color) hover:text-white transition-colors duration-300 flex justify-center items-center">
                      <HeartIcon className="text-xl" />
                    </button>
                    <span
                      className={cn(
                        "absolute off-product top-0 right-0 px-4 py-2 Merienda text-xs font-bold text-white rounded-lg",
                        product.sale === "New"
                          ? "bg-yellow-400"
                          : product.sale?.includes("%")
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
                  <button className="w-full px-4 my-2 text-lg font-semibold text-(--primary-color) bg-(--primary-light) rounded-md hover:bg-(--primary-color) hover:text-white cursor-pointer transition-all flex justify-center items-center py-3">
                    Add to Cart <ShoppingCartIcon />
                  </button>
                </div>
              ))
            ) : (
              <p className="font-bold border-b h-7 text-gray-500">
                No Product Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
