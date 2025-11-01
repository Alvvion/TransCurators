import Link from "next/link";
import { useUserStore } from "@/utils/store";
import { logoutAction } from "@/actions/actions";

const TopNav = () => {
  const user = useUserStore((state) => state.user);
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
            href="/login"
            className="pr-3 border-r-2 border-gray-300 hover:underline"
          >
            {user.name}
          </Link>
          {user.name === "Guest" ? (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          ) : (
            <button
              onClick={async () => await logoutAction()}
              className="hover:underline cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </section>
    </nav>
  );
};

export default TopNav;
