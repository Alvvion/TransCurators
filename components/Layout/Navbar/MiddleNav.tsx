"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SearchIcon,
  MapPinPenIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "lucide-react";

import products from "@/constants/jsonData.json";
import { Product } from "@/components/Banners/Deals";
import Image from "next/image";

type MiddleNavProps = {
  cartCount: number;
  wishlistCount: number;
};

const MiddleNav: React.FC<MiddleNavProps> = ({ cartCount, wishlistCount }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const allProducts: Product[] = useMemo(() => [...products], []);

  const results = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return [];
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(trimmed)
    );
  }, [allProducts, searchTerm]);

  return (
    <nav className="w-full bg-(--primary-light) border-b border-gray-300 relative">
      <section className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold Merienda text-black">
          Shop<span className="text-(--primary-color)">Mart</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 ms-6 lg:mx-0 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for a Product"
            className="flex-1 border px-3 py-2 rounded-s-lg border-gray-400 outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-(--primary-color) text-white px-3 rounded-r cursor-pointer">
            <SearchIcon className="" />
          </button>

          {/* Search Result */}
          {results.length > 0 && (
            <div className="search-result absolute top-12 left-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 grid grid-cols-1 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
              {results.map((item, i) => (
                <Link
                  key={`${item.Id}-${i}`}
                  href={{
                    pathname: "/shop",
                    query: { id: item.Id },
                  }}
                  onClick={() => setSearchTerm("")}
                >
                  <div className="flex flex-col items-center p-2 border border-gray-300 rounded-md hover:shadow-lg transition-all">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                    <h3 className="font-semibold text-sm text-center mt-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Location Dropdown */}
          <div className="hidden lg:flex text-sm ms-5 bg-white items-center ps-4 rounded-lg border border-gray-400">
            <MapPinPenIcon className="text-lg text-(--primary-color)" />
            <select
              name="location"
              className="px-3 rounded-lg text-(--primary-color) font-semibold focus:border-(--primary-color) appearance-none cursor-pointer outline-none"
              defaultValue="South Extension"
            >
              <option>South Extension</option>
              <option>Lajpat Nagar</option>
              <option>Dili Haat INA</option>
              <option>Sarojni Nagar</option>
              <option>Adrewsganj</option>
              <option>Laxmi Bai Nagar</option>
            </select>
          </div>
        </div>
        {/* Wishlist & Cart */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/wishlist" className="relative">
            <HeartIcon className="text-gray-600 text-xl hover:text-(--primary-color) transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--primary-color) text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="text-gray-600 text-xl hover:text-(--primary-color) transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--primary-color) text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default MiddleNav;
