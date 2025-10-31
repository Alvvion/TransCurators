import Link from "next/link";
import {
  SearchIcon,
  MapPinPenIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "lucide-react";

const MiddleNav = () => {
  return (
    <nav className="w-full bg-(--primary-light) border-b border-gray-300 relative">
      <section className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold Merienda text-black">
          Shop<span className="text-(--primary-color)">Mart</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 ms-6 lg:mx-0 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for a Product"
            className="flex-1 border px-3 py-2 rounded-s-lg border-gray-400 outline-none w-full"
          />
          <button className="bg-(--primary-color) text-white px-3 rounded-r cursor-pointer">
            <SearchIcon className="" />
          </button>

          {/* Location Dropdown */}
          <div className="hidden lg:flex text-sm ms-5 bg-white items-center ps-4 rounded-lg border border-gray-400">
            <MapPinPenIcon className="text-lg text-(--primary-color)" />
            <select
              name="location"
              className="px-3 rounded-lg text-(--primary-color) font-semibold focus:border-(--primary-color) appearance-none cursor-pointer outline-none"
              defaultValue="South Extension"
            >
              <option>South Extension</option>
              <option>Lajpat Nagar</option>
              <option>Dili Haat INA</option>
              <option>Sarojni Nagar</option>
              <option>Adrewsganj</option>
              <option>Laxmi Bai Nagar</option>
            </select>
          </div>
        </div>
        {/* Wishlist & Cart */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="#" className="relative">
            <HeartIcon className="text-gray-600 text-xl hover:text-(--primary-color) transition-colors" />
            <span className="absolute -top-2 -right-2 bg-(--primary-color) text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              1
            </span>
          </Link>
          <Link href="#" className="relative">
            <ShoppingCartIcon className="text-gray-600 text-xl hover:text-(--primary-color) transition-colors" />
            <span className="absolute -top-2 -right-2 bg-(--primary-color) text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              1
            </span>
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default MiddleNav;
