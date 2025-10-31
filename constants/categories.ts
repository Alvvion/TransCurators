import type { StaticImageData } from "next/image";

import Category1 from "@/public/Category1.png";
import Category2 from "@/public/Category2.png";
import Category3 from "@/public/Category3.png";
import Category4 from "@/public/Category4.png";
import Category5 from "@/public/Category5.png";
import Category6 from "@/public/Category6.png";
import Category7 from "@/public/Category7.png";
import Category8 from "@/public/Category8.png";
import Category9 from "@/public/Category9.png";
import Category10 from "@/public/Category10.png";

type CategoryType = {
  image: StaticImageData;
  title: string;
  product: string;
};

export const categories: CategoryType[] = [
  { image: Category1, title: "Vegetables", product: "125+ Products" },
  { image: Category2, title: "Fish & Meats", product: "90+ Products" },
  { image: Category3, title: "Desserts", product: "80+ Products" },
  { image: Category4, title: "Drinks & Jucie", product: "60+ Products" },
  { image: Category5, title: "Animals Food", product: "100+ Products" },
  { image: Category6, title: "Fresh Fruits", product: "70+ Products" },
  { image: Category7, title: "Chololates & Candy", product: "50+ Products" },
  { image: Category8, title: "Dairy & Eggs", product: "45+ Products" },
  { image: Category9, title: "Snacks", product: "110+ Products" },
  { image: Category10, title: "Frozen Foods", product: "40+ Products" },
];
