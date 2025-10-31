import { offers } from "@/constants/banners";
import cn from "@/utils/cn";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const Offers = () => {
  return (
    <div className="px-[8%] lg:px-[12%] mb-10">
      <div className="flex flex-col lg:flex-row gap-5">
        {offers.map((offer, i) => (
          <div
            key={i}
            className={cn(
              "offer-wrap px-5 py-6 rounded-2xl flex flex-col md:flex-row justify-between items-center",
              offer.className || ""
            )}
          >
            <div className="w-full lg:w-1/2 deal-image">
              <Image src={offer.image} alt={offer.title} className="" />
            </div>
            <div className="deal-info w-full lg:w-1/2">
              <h2 className="Merienda font-bold text-white text-4xl leading-11 whitespace-pre-line">
                {offer.title}
              </h2>
              <p className="my-2 text-lg text-white font-normal">
                {offer.description}
              </p>
              <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-black flex justify-center items-center hover:bg-white hover:text-(--prim-color) transition-all duration-300 cursor-pointer">
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

export default Offers;
