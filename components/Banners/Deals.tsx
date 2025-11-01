"use client";

import { dealData } from "@/constants/banners";
import products from "@/constants/jsonData.json";
import { handleAddToCart } from "@/utils/clientFunctions";
import cn from "@/utils/cn";
import { useCartStore, useUserStore } from "@/utils/store";
import { ArrowRightIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type Product = {
  Id: string;
  image: string;
  title: string;
  price: string;
  lessprice: string;
  review: string;
  sold: string;
};

const Deals = () => {
  const user = useUserStore((state) => state.user);
  const incrementCart = useCartStore((state) => state.incrementCart);
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="title my-10  w-full flex flex-col  lg:flex-row justify-between items-start gap-5">
        <h1 className="Unbounded text-5xl">Todays Best Deals</h1>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 1500 }}
        speed={1500}
        breakpoints={{
          1200: { slidesPerView: 2 },
          991: { slidesPerView: 2 },
          767: { slidesPerView: 2 },
          575: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
      >
        {dealData.map((deal, i) => (
          <SwiperSlide key={i}>
            <div
              className={cn(
                "deals-wrap px-5 rounded-2xl flex flex-col lg:flex-row justify-between items-center",
                deal.className || ""
              )}
            >
              <div className="w-full lg:w-1/2  deal-image">
                <Image src={deal.image} alt={deal.title} className="" />
              </div>
              <div className="w-full lg:w-1/2 deal-info">
                <h2 className="Merienda font-bold text-4xl leading-11 whitespace-pre-line">
                  {deal.title}
                </h2>
                <p className="my-2 text-gray-800 font-normal">
                  {deal.description}
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-(--primary-color) flex justify-center items-center hover:bg-white hover:text-(--prim-color) transition-all duration-300 cursor-pointer my-3">
                  Shop Now
                  <ArrowRightIcon className="ps-2" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Best Deals Product */}
      <div className="my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product: Product) => (
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
                <div className="absolute top-0 right-0 flex justify-between items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product,
                        user.id,
                        incrementCart,
                        user.name === "Guest" ? "true" : "false"
                      )
                    }
                    className="px-4 py-2 font-semibold text-(--primary-color) bg-(--primary-light) rounded-full text-base hover:bg-(--primary-color) hover:text-white cursor-pointer transition-all flex justify-center items-center"
                  >
                    Add <ShoppingCartIcon />
                  </button>
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
