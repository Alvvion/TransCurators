type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "Shop", href: "/shop" },
      { label: "Shop Details", href: "/shop-details" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
      { label: "Account", href: "/account" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
