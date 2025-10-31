import Banners from "@/components/Banners/Banners";
import Deals from "@/components/Banners/Deals";
import Offers from "@/components/Banners/Offers";
import Recommend from "@/components/Products/Recommend";
import Categories from "@/components/Layout/Categories/Categories";
import Hero from "@/components/Layout/Hero/Hero";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Categories />
      <Banners />
      <Deals />
      <Offers />
      <Recommend />
    </div>
  );
}
