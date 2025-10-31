import { banners } from "@/constants/banners";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const Banners = () => {
  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {banners.map((banner, i) => (
          <div key={i} className="relative">
            <Image
              src={banner.image}
              alt={`Banner ${i + 1}`}
              className="w-full"
            />
            <div className="banner-content absolute bottom-[5%] left-[5%]">
              <h2 className="Merienda font-bold text-3xl leading-11 whitespace-pre-line">
                {banner.heading}
              </h2>
              <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-(--primary-color) flex justify-center items-center hover:bg-white hover:text-(--prim-color) transition-all duration-300 cursor-pointer">
                Shop Now
                <ArrowRightIcon className="ps-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
