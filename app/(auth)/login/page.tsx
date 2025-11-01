"use server";

import { loginAction, registerAction } from "@/actions/actions";

const SignIn = async () => {
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
            <form action={loginAction}>
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
                  className="px-8 py-3 rounded-md text-white Unbounded bg-(--primary-color) mx-auto"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          {/* Register */}
          <div className="w-full lg:w-1/2 gap-3 border border-gray-300 px-5 py-8 rounded-lg hover:border-(--primary-color)">
            <h2 className="Unbounded text-xl mb-10 text-center">Login</h2>
            <form action={registerAction}>
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
                  className="px-8 py-3 rounded-md text-white Unbounded bg-(--primary-color) mx-auto"
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
