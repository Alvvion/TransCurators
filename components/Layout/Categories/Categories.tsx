"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { categories } from "@/constants/banners";

const Categories = () => {
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <Swiper
        slidesPerView={8}
        spaceBetween={20}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 1500 }}
        speed={1500}
        breakpoints={{
          1200: { slidesPerView: 8 },
          991: { slidesPerView: 5 },
          767: { slidesPerView: 4 },
          575: { slidesPerView: 3 },
          0: { slidesPerView: 3 },
        }}
      >
        {categories.map((category, i) => (
          <SwiperSlide key={i}>
            <div className="category-wrap flex flex-col justify-center-safe items-center cursor-pointer">
              <div className="category-image">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="transition-all duration-300"
                />
              </div>
              <div className="category-info my-2 flex flex-col justify-center items-center">
                <h2 className="Unbouned text-lg hover:text-(--primary-color) transition-colors duration-300">
                  {category.title}
                </h2>
                <p className="text-gray-500">{category.product}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
