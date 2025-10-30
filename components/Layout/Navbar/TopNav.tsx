import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="w-full bg-(--primary-color) text-white text-sm">
      <section className="flex items-center justify-between py-3 px-[8%] lg:px-[12%]">
        <div className="flex space-x-4">
          <Link
            href="#"
            className="pr-3 border-r-2 border-gray-300 hover:underline"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="pr-3 border-r-2 border-gray-300 hover:underline"
          >
            Free Delivery
          </Link>
          <Link href="#" className="hover:underline">
            Return Policy
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="#"
            className="pr-3 border-r-2 border-gray-300 hover:underline"
          >
            Help Center
          </Link>
          <Link href="#" className="hover:underline">
            My Account
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default TopNav;
