import React, { useContext } from "react";
import Link from "next/link";
import { StateContext } from "../context/context.js";
const Navbar = () => {
  const { cart } = useContext(StateContext);

  const itemCount = typeof window !== "undefined" ? cart.length : 0;
  return (
    <div className="flex h-16 items-center justify-between shadow-lg ">
      <div className="text-[25px] ml-5 font-bold">
        <Link href="/">My Ecom</Link>
      </div>
      <div className="flex gap-2 mr-4">
        <Link href="/cart" className="p-2 mr-5">
          <a className="flex">
            Cart
            <div className="ml-1  w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-500 text-white">
              {itemCount}
            </div>
          </a>
        </Link>
        <Link href="/login" className="p-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
