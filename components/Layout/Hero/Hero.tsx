"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Image from "next/image";
import Hero1 from "@/public/hero-img1.png";
import Hero2 from "@/public/hero-img2.png";

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="relative p-10 px-20 Hero flex items-center gap-5 w-full">
        <Swiper
          slidesPerView={1}
          loop
          modules={[Navigation]}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2">
                <h1 className="Merienda text-2xl lg:text-6xl font-bold">
                  Daily Grocery Order and Get Express Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Order your daily groceries online and enjoy express delivery
                  straight to your doorstep. Fresh produce, essentials, and
                  more-fast, convenient, and reliable service for your everyday
                  needs
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-(--primary-color) hover:bg-white hover:text-(--primary-color) transition-colors duration-300 cursor-pointer flex flex-row items-center justify-center">
                  Shop Now
                  <ShoppingBasketIcon />
                </button>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image
                  src={Hero1}
                  alt="Groceries"
                  className="Hero-image select-none"
                />
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2">
                <h1 className="Merienda text-2xl lg:text-6xl font-bold">
                  Daily Grocery Order and Get Express Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Order your daily groceries online and enjoy express delivery
                  straight to your doorstep. Fresh produce, essentials, and
                  more-fast, convenient, and reliable service for your everyday
                  needs
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-(--primary-color) hover:bg-white hover:text-(--primary-color) transition-colors duration-300 cursor-pointer flex flex-row items-center justify-center">
                  Shop Now
                  <ShoppingBasketIcon />
                </button>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image
                  src={Hero2}
                  alt="Groceries"
                  className="Hero-image select-none"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* Custom Navigation Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="swiper-button-prev-custom absolute left-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white"
        >
          <ArrowLeftIcon className="text-2xl text-gray-800" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="swiper-button-next-custom absolute right-5 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-3 py-2 shadow hover:bg-white"
        >
          <ArrowRightIcon className="text-2xl text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
