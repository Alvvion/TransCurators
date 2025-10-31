"use client";
import cn from "@/utils/cn";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HeartIcon,
  MenuIcon,
  PhoneIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { navLinks } from "@/constants/navlinks";

const BottomNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropDowns] = useState<Record<string, boolean>>(
    {}
  );
  const [isFixed, setIsFixed] = useState(false);

  const toggleDropdown = (label: string) =>
    setOpenDropDowns((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleScroll = useCallback(() => {
    setIsFixed(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={cn(
        "w-full bg-white shadow-sm transition-all duration-500",
        isFixed && "fixed top-0 left-0 z-50 fixed-nav"
      )}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%] text-gray-700">
        {/* Desktop Nav */}
        <Link
          href="/"
          className={cn(
            "text-3xl font-bold Merienda text-black",
            isFixed ? "lg:flex" : "hidden"
          )}
        >
          Shop<span className="text-(--primary-color)">Mart</span>
        </Link>

        <nav className="hidden lg:flex space-x-6 relative menu-link">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group z-9999">
                <Link href={link.href} className="flex items-center gap-1">
                  {link.label} <ChevronDown size={12} />
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl p-2 border border-gray-100 rounded-lg min-w-[150px]">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 rounded-md hover:bg-(--primary-light) transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href} className="">
                {link.label}
              </Link>
            )
          )}
        </nav>
        <button className="cursor-pointer font-bold bg-(--primary-color) text-white p-3 hidden lg:flex gap-2">
          <PhoneIcon className="text-xl" /> 91+ 123 456 789
        </button>

        {/* Mobile Nav */}
        <div className="flex lg:hidden items-center justify-between gap-4 w-full">
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-x-5">
              <MenuIcon />
            </div>
          </button>
          <div className="flex lg:hidden items-center space-x-6">
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
          <button className="nav-button cursor-pointer font-bold bg-(--primary-color) text-white p-3 gap-2">
            <PhoneIcon className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md overflow-hidden transition-all duration-500">
          <nav className="flex flex-col px-[4%] py-4 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    className="flex justify-between items-center w-full p-2 font-medium rounded-md hover:bg-gray-100"
                    onClick={() => toggleDropdown(link.label)}
                  >
                    {link.label}{" "}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform",
                        openDropdowns[link.label] && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      openDropdowns[link.label] ? "max-h-60 mt-1" : "max-h-0"
                    )}
                  >
                    <div className="flex flex-col bg-(--primary-light) p-2 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block p-2 font-medium rounded-md bg-white hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-2 py-2 font-medium rounded-md hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
