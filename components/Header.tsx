import React, { useState,useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { selectBasketItems } from "@/redux/basketSlice";
import { useSelector } from "react-redux";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
function Header() {
  const router = useRouter();
  const items = useSelector(selectBasketItems);
  const session = useSession();
  return (
    <header>
      <div className="flex items-center justify-between bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex  items-center flex-grow sm:flex-grow-0">
          <img
          loading="lazy"
            onClick={() => router.push("/")}
            className="cursor-pointer "
            src="/amazon_PNG11.png"
            width={150}
            height={150}
            alt=""
          />
        </div>
        <div className="hidden  md:flex items-center h-10 flex-grow rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer mx-4">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <MagnifyingGlassIcon className="h-12 p-4 " />
        </div>

        <div className="text-white flex items-center text-[13px] sm:text-xs space-x-6 mx-2 whitespace-nowrap">
          <div
            onClick={!session.data ? () => signIn() : () => signOut()}
            className="cursor-pointer hover:underline sm:text-sm"
          >
            <p>
              {" "}
              {session.data
                ? `Signed in as ${session.data?.user?.name}`
                : "Sign in"}
            </p>
            <p>Account & Lists</p>
          </div>
{/* */}
          <div className="cursor-pointer hover:underline sm:text-sm">
            <p>Returns</p>
            <p>& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative cursor-pointer hover:underline sm:text-sm flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 bg-yellow-500 rounded-full h-4 w-4 text-center text-black flex items-center justify-center font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden sm:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amazon_blue-light space-x-3 p-2 pl-6 flex items-center text-sm text-white">
        <p className="flex items-center cursor-pointer hover:underline sm:text-sm">
          <Bars3Icon className="h-7 cursor-pointer mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today`s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics </p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
