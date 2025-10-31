import type { StaticImageData } from "next/image";

import PromotionBanner1 from "@/public/promotional-banner-img1.png";
import PromotionBanner2 from "@/public/promotional-banner-img2.png";
import PromotionBanner3 from "@/public/promotional-banner-img3.png";
import PromotionBanner4 from "@/public/promotional-banner-img4.png";

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
