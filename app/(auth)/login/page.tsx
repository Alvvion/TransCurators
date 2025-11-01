"use client";

import toast from "react-hot-toast";
import { useUserStore, useCartStore, useWishlistStore } from "@/utils/store";
import { getProductCountAction } from "@/actions/actions";
import { login, register } from "@/actions/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setCartCount = useCartStore((state) => state.setCartCount);
  const setWishlistCount = useWishlistStore((state) => state.setWishlistCount);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result.status) {
      toast.success(`Welcome ${result.user!.name || ""}\nYou are logged in`);
      setUser(result.user!);
      const counter = await getProductCountAction(formData);
      if (counter) {
        setCartCount(counter.cartCount || 0);
        setWishlistCount(counter.wishlistCount || 0);
      }
      router.replace("/");
    } else {
      toast.error(`Error occured ${result.error}`);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await register(formData);
    if (result.status) {
      toast.success(`Welcome ${result.user!.name || ""}\nYou have registed`);
      setUser(result.user!);
      const counter = await getProductCountAction(formData);
      if (counter) {
        setCartCount(counter.cartCount || 0);
        setWishlistCount(counter.wishlistCount || 0);
      }
      router.replace("/");
    } else {
      toast.error(`Error occured ${result.error}`);
    }
  };
  return (
    <>
      <div className="px-[8%] lg:px-[12%] bg-[#e6f9ef] py-5">
        <div className="flex justify-center items-center">
          <h2 className="Unbounded text-2xl">Account</h2>
        </div>
      </div>
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          {/* Login */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-(--primary-color)">
            <h2 className="Unbounded text-xl mb-10 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col mb-5 gap-2">
                <label htmlFor="email" className="Unbounded mb-2">
                  Email *
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="JohnDoe@email.com"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-(--primary-color)"
                />
                <label htmlFor="password" className="Unbounded mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-(--primary-color)"
                />
              </div>
              <div className="flex items-center gap-5 mb-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-md text-white Unbounded bg-(--primary-color) mx-auto cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          {/* Register */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-(--primary-color)">
            <h2 className="Unbounded text-xl mb-10 text-center">Login</h2>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col mb-5 gap-2">
                <label htmlFor="name" className="Unbounded mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-(--primary-color)"
                />
                <label htmlFor="email" className="Unbounded mb-2">
                  Email *
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="JohnDoe@email.com"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-(--primary-color)"
                />
                <label htmlFor="password" className="Unbounded mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="JohnDoe@email.com"
                  className="rounded-md border border-gray-300 p-3 focus:outline-none focus:border-(--primary-color)"
                />
              </div>
              <div className="flex items-center gap-5 mb-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-md text-white Unbounded bg-(--primary-color) mx-auto cursor-pointer"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
