"use client";

import { useState } from "react";
import BottomNav from "./BottomNav";
import MiddleNav from "./MiddleNav";
import TopNav from "./TopNav";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  return (
    <header>
      <TopNav />
      <MiddleNav cartCount={cartCount} wishlistCount={wishlistCount} />
      <BottomNav cartCount={cartCount} wishlistCount={wishlistCount} />
    </header>
  );
};

export default Navbar;
