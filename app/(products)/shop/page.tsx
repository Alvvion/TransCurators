"use client";

import { useMemo } from "react";
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
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  return (
    <div className="">
      {productId ? (
        <ProductDetails id={productId} products={allProducts} />
      ) : (
        <Products products={allProducts} />
      )}
    </div>
  );
};

export default Shop;
