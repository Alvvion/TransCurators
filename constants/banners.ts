import type { StaticImageData } from "next/image";

import PromotionBanner1 from "@/public/promotional-banner-img1.png";
import PromotionBanner2 from "@/public/promotional-banner-img2.png";
import PromotionBanner3 from "@/public/promotional-banner-img3.png";
import PromotionBanner4 from "@/public/promotional-banner-img4.png";
import Deal1 from "@/public/Deals-bg1.png";
import Deal2 from "@/public/Deals-bg2.png";
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

type BannerType = {
  image: StaticImageData;
  heading: string;
};

export const banners: BannerType[] = [
  { image: PromotionBanner1, heading: "Everyday\nFresh Meat" },
  { image: PromotionBanner2, heading: "Daily Fresh\nVegetables" },
  { image: PromotionBanner3, heading: "Everyday\nFresh Milk" },
  { image: PromotionBanner4, heading: "Everyday\nFresh Fruits" },
];

type DealItem = {
  image: StaticImageData;
  title: string;
  description: string;
  className?: string;
};

export const dealData: DealItem[] = [
  {
    image: Deal1,
    title: "Fresh Vegetables",
    description:
      "Shop fresh, healthy vegetables delivered daily. Taste the garden in every bite!",
  },
  {
    image: Deal2,
    title: "Daily Snacks",
    description:
      "Tasty daily snacks for every craving — fresh, fun, and ready to munch!",
    className: "deals-wrap2",
  },
  {
    image: Deal1,
    title: "Fresh Vegetables",
    description:
      "Shop fresh, healthy vegetables delivered daily. Taste the garden in every bite!",
  },
];

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
