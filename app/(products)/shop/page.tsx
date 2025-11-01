"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductDetails from "@/components/Products/ProductDetails";
import Products from "@/components/Products/Products";

import BestSales from "@/constants/BestSales.json";
import Featured from "@/constants/Featured.json";
import HotDeals from "@/constants/HotDeals.json";
import NewArrivals from "@/constants/NewArrivals.json";
import TopRated from "@/constants/TopRated.json";
import products from "@/constants/jsonData.json";
import OnSale from "@/constants/OnSale.json";
import OrganicFoods from "@/constants/OrganicFoods.json";
import Recommend from "@/constants/Recommend.json";
import TopSelling from "@/constants/TopSelling.json";

export type AllProduct = {
  Id: string;
  image: string;
  title: string;
  price: string;
  lessprice: string;
  review: string;
  sold?: string;
  sale?: string;
};

const ShopContent = ({ allProducts }: { allProducts: AllProduct[] }) => {
  const searchParams = useSearchParams(); // ✅ now inside Suspense
  const productId = searchParams.get("id");

  return productId ? (
    <ProductDetails id={productId} products={allProducts} />
  ) : (
    <Products products={allProducts} />
  );
};

const Shop = () => {
  const allProducts: AllProduct[] = useMemo(
    () => [
      ...products,
      ...BestSales,
      ...Featured,
      ...HotDeals,
      ...NewArrivals,
      ...TopRated,
      ...OnSale,
      ...OrganicFoods,
      ...Recommend,
      ...TopSelling,
    ],
    []
  );

  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent allProducts={allProducts} />
    </Suspense>
  );
};

export default Shop;
