import Banners from "@/components/Banners/Banners";
import Deals from "@/components/Banners/Deals";
import Categories from "@/components/Layout/Categories/Categories";
import Hero from "@/components/Layout/Hero/Hero";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Categories />
      <Banners />
      <Deals />
    </div>
  );
}
