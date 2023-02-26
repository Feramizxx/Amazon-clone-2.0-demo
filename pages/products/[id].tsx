import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addForQuantity } from "@/redux/basketSlice";

type Props = {
  item: Product;
};

function ProductSlug({ item }: Props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleChange(event: any) {
    setQuantity(parseInt(event.target.value));
    setIsOpen(false);
  }

  const countStarItems = [];
  for (let i = 0; i < item.rating.rate; i++) {
    countStarItems.push(<StarIcon className="h-5 text-yellow-500" key={i} />);
  }

  return (
    <div className="">
      <Header />

      <div className="max-w-[1260px] mx-auto flex-col   md:flex-row flex mt-10 px-10 items-start md:space-x-8">
        <div className="bg-white rounded-lg shrink-0 p-10">
          <Image
            src={item.image}
            alt={item.title}
            className="object-contain mx-auto "
            width={320}
            height={320}
          />
        </div>
        <div className="flex flex-col mt-4 sm:mt-0 space-y-3">
          <div className="">
            <h1 className="text-blue-800 hover:underline">
              Visit the Dickies Store
            </h1>
            <h2 className="text-gray-600 text-xl">{item.title}</h2>
          </div>

          <div className="flex space-x-5">
            <span className="flex">{countStarItems}</span>
            <span className="text-blue-800 hover:underline">
              {(item.rating.rate * 120).toFixed(0)} ratings |{" "}
              {(item.rating.rate * 80).toFixed(0)} answered questions
            </span>
          </div>
          <hr className="border-[1.5px]" />
          <div className="flex space-x-2">
            <span className="text-gray-500">Price: </span>
            <span className="text-red-800 font-bold text-xl">
              ${item.price.toFixed(2)}
            </span>
          </div>
          {(item.category == "men's clothing" ||
            item.category == "women's clothing") && (
            <div className="flex space-y-1 w-36 flex-col">
              <span className="text-gray-500">Size:</span>
              <select
                className="bg-gray-200 border cursor-pointer  border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500   px-4 py-1 rounded-lg"
                name="color"
                id=""
              >
                <option className="w-32" value="">
                  Select
                </option>
                <option className="" value="">
                  X-Small
                </option>
                <option className="" value="">
                  Small
                </option>
                <option className="" value="">
                  Medium
                </option>
                <option className="" value="">
                  Large
                </option>
                <option className="" value="">
                  X-Large
                </option>
                <option className="" value="">
                  X-Large Tall
                </option>
              </select>
            </div>
          )}
          <div>
            <p>{item.description}</p>
          </div>
        </div>

        <div className="flex flex-col  min-w-[25%] mt-12 md:mt-0">
          <div className="border-2  sm:w-72 rounded-lg px-8 py-2">
            <div>
              <h1 className="font-bold text-md">One-time purchase:</h1>
              <span className="text-red-800 font-bold text-sm">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-500 pt-1">
              No Import Fees Deposit & 15.99$ Shipping to Azerbaijan Delivery
              <span className="font-bold"> March 1 - 8</span>
            </p>
            <p className="flex items-center space-x-1">
              <MapPinIcon className="w-4 h-4  text-gray-500" />
              <span className="text-blue-900 hover:text-red-900 cursor-pointer">
                Deliver to Azerbaijan
              </span>
            </p>

            <div>
              <h1 className="text-green-700 font-[600] text-lg mt-2">
                In Stock
              </h1>
              {/* <select name="quantity" className="bg-gray-200 px-2 py-[1.5px] ">
              <option value="">Qty: </option>

                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select> */}
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="relative mb-2 w-full py-2 pl-3 pr-10 text-left bg-gray-200  border border-gray-400 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span className="block truncate">Qty: {quantity}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
                <span className="italic text-gray-400 ">Subtotal: {(quantity*item.price).toFixed(2)}$</span>
                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg">
                    <div className="py-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <button
                          key={i + 1}
                          type="button"
                          onClick={handleChange}
                          value={i + 1}
                          className={`block w-full px-4 py-2 text-left ${
                            quantity === i + 1
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100"
                          } focus:outline-none`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex mt-2">
              <button onClick={()=>dispatch(addForQuantity({...item, quantity:quantity}))} className="button  w-full rounded-md">Add to Cart</button>
            </div>

            <div className="grid grid-rows-3 pt-2  w-52 px-2 ">
              <div className="grid grid-cols-2 whitespace-nowrap ">
                <span>Payment</span>
                <span className="text-blue-700 hover:underline">
                  Secure transaction
                </span>
              </div>
              <div className="grid grid-cols-2 whitespace-nowrap">
                <span>Ships From</span>
                <span>Amazon.com</span>
              </div>
              <div className="grid grid-cols-2 whitespace-nowrap">
                <span>Sold by</span>
                <span>Amazon.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlug;

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const paths = data.map((item: any) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return {
    props: { item: data },
  };
};
