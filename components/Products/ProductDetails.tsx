import { AllProduct } from "@/app/(products)/shop/page";
import Products from "./Products";
import Image from "next/image";
import {
  HeartIcon,
  IndianRupeeIcon,
  PackageCheckIcon,
  ShoppingCartIcon,
  StarIcon,
  StoreIcon,
  Undo2Icon,
  ZapIcon,
} from "lucide-react";

import SatisfactionIcon from "@/public/satisfaction-icon.png";
import Recommend from "./Recommend";

type ProductDetailsProps = {
  id: string;
  products: AllProduct[];
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ id, products }) => {
  if (!id) return <Products products={products} />;

  const product = products.find((p) => String(p.Id) === String(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <div className="px-[4%] lg:pl-[12%] py-10">
        <div className="flex justify-between gap-5">
          <div className="w-full flex flex-col justify-between lg:flex-row gap-5 sticky top-2/22 left-0 h-fit">
            <div className="border border-gray-300 rounded-2xl">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain p-20 mx-auto"
              />
            </div>
            <div className="w-full lg:w-2/3 flex flex-col">
              <h2 className="Unbounded text-3xl">{product.title}</h2>
              <span className="flex items-center border-b border-gray-300 pb-3 text-yellow-500 mt-4">
                <StarIcon className="fill-yellow-500 me-1" />
                <StarIcon className="fill-yellow-500 me-1" />
                <StarIcon className="fill-yellow-500 me-1" />
                <StarIcon className="fill-yellow-500 me-1" />
                <StarIcon className="fill-yellow-500 me-1" />
                &nbsp;
                <span className="text-black font-medium">
                  4.5 star Rating {product.review}
                </span>
              </span>
              <p className="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                ex architecto voluptate rerum consectetur unde aperiam laborum
                officiis similique repellat itaque a placeat, atque cum nisi
                dolores ad id assumenda!
              </p>
              <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
                <h3 className="Unbounded text-2xl">{product.price}</h3>
                <del className="Unbounded text-gray-500">
                  {product.lessprice}
                </del>
              </div>
              <span className="my-3 bg-[#97ffc971] px-2 py-3 rounded-md">
                Special Offer: <strong> 5 Days </strong> Remains untill the end
                of the offer
              </span>
              <div className="">
                <div className="flex items-start justify-start gap-10">
                  <h3 className="mb-3">Quantity :</h3>
                  <div className="flex items-center border w-24 justify-around">
                    <button className="flex text-lg cursor-pointer">-</button>
                    <span className="px-4">1</span>
                    <button className="flex text-lg cursor-pointer">+</button>
                  </div>
                </div>
                <div className=" flex gap-5 justify-start items-center">
                  <button className="w-full px-4 my-2 text-lg font-semibold text-(--primary-light) bg-(--primary-color) rounded-md hover:bg-[#0C9A41] hover:text-white cursor-pointer transition-all flex justify-center items-center py-3 gap-4">
                    <ShoppingCartIcon /> Add to Cart
                  </button>
                  <button className="w-full px-4 my-2 text-lg font-semibold text-(--primary-color) bg-(--primary-light) rounded-md hover:bg-(--primary-color) hover:text-white cursor-pointer transition-all flex justify-center items-center py-3 gap-4">
                    <HeartIcon /> Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-full lg:w-1/3">
            <div className="bg-[#97ffc871]">
              <div className="flex items-center px-7 py-4 border-b border-gray-300 gap-3">
                <ZapIcon className="text-(--primary-color) mr-2 size-10" />
                <div className="flex flex-col">
                  <h3 className="Unbounded">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Lightning-fast shipping, guaranteed.
                  </p>
                </div>
              </div>
              <div className="flex items-center px-7 py-4 border-b border-gray-300 gap-3">
                <Undo2Icon className="text-(--primary-color) mr-2 size-10" />
                <div className="flex flex-col">
                  <h3 className="Unbounded">Free 30-day returnsy</h3>
                  <p className="text-gray-600">
                    Shop risk-free with easy returns.
                  </p>
                </div>
              </div>
              <div className="flex items-center px-7 py-4 border-b border-gray-300 gap-3">
                <StoreIcon className="text-(--primary-color) mr-2 size-10" />
                <div className="flex flex-col">
                  <h3 className="Unbounded">
                    Pickup available at Shop location
                  </h3>
                  <p className="text-gray-600">Usually ready in 24 hours.</p>
                </div>
              </div>
              <div className="flex items-center px-7 py-4 border-b border-gray-300 gap-3">
                <IndianRupeeIcon className="text-(--primary-color) mr-2 size-10" />
                <div className="flex flex-col">
                  <h3 className="Unbounded">Payment</h3>
                  <p className="text-gray-600">
                    Payment by card, Google Pay, Online card.
                  </p>
                </div>
              </div>
              <div className="flex items-center px-7 py-4 border-b border-gray-300 gap-3">
                <PackageCheckIcon className="text-(--primary-color) mr-2 size-10" />
                <div className="flex flex-col">
                  <h3 className="Unbounded">Packaging</h3>
                  <p className="text-gray-600">Safe eco-friendly packing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 mt-10 rounded-lg">
          <div className="flex justify-between items-center border-b p-3 pb-5 border-gray-300 gap-2">
            <span className="bg-(--primary-color) px-4 py-2 text-white font-semibold text-xl rounded-full">
              Description
            </span>
            <span className="bg-[#97ffc871] px-4 py-2 text-(--primary-color) font-semibold text-xl rounded-full flex gap-3">
              <Image src={SatisfactionIcon} alt="Statisfiaction Icon" /> 100%
              statisfaction Guaranteed
            </span>
          </div>
          <div className="p-5 mt-5">
            <h2 className="Unbounded text-2xl mb-3">Product Description</h2>
            <p className="text-gray-500 mb-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              culpa? Aliquid veritatis ullam dolores debitis ratione molestiae
              doloribus quasi exercitationem.
            </p>
            <p className="text-gray-500 mb-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              culpa? Aliquid veritatis ullam dolores debitis ratione molestiae
              doloribus quasi exercitationem.
            </p>
            <p className="text-gray-500 mb-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              culpa? Aliquid veritatis ullam dolores debitis ratione molestiae
              doloribus quasi exercitationem.
            </p>
          </div>
          <div className="ps-5 mt-5">
            <p className="text-gray-500 mb-1">
              <span>•</span> 8.0 oz. bag of LAY&apos;S Classic Potato Chips
            </p>
            <p className="text-gray-500 mb-1">
              <span>•</span> Tasty LAY&apos;s potato chips are a great snack
            </p>
            <p className="text-gray-500 mb-1">
              <span>•</span> Includes three ingredients: potatoes, oil, and salt
            </p>
            <p className="text-gray-500 mb-1">
              <span>•</span> Gluten free product
            </p>
          </div>
        </div>
      </div>
      <Recommend />
    </div>
  );
};

export default ProductDetails;
