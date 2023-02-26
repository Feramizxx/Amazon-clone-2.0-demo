import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/basketSlice";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";
import { removeFromBasket } from "@/redux/basketSlice";
type Props = {
  items: Product[];
  quantity: number;
};
function CheckoutItems({ items, quantity }: Props) {
  const Items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const iconComponents = [];
  for (let i = 0; i < Math.ceil(items[0].rating.rate); i++) {
    iconComponents.push(<StarIcon className="h-5 text-yellow-500" key={i} />);
  }
  const addItemToBasket = () => {
    dispatch(addToBasket({ ...items[0], quantity }));
  };

  const removeFrombasket = () => {
    dispatch(removeFromBasket(items[0]));
  };
  return (
    <div className="grid grid-cols-5 items-center sm:items-start">


   <Link href={`/products/${items[0].id}`}>
   <Image
        className="col-span-1 bject-contain"
        src={items[0].image}
        width={200}
        height={200}
        alt={items[0].title}
      /></Link>    
      <div className="col-span-3 text-xs sm:text-lg   mt-4 mx-4">
       <Link href={`/products/${items[0].id}`}> <h4 className="pb-4">{items[0].title}</h4></Link>  
        <p className="flex">{iconComponents}</p>
        <p className="line-clamp-3">{items[0].description}</p>
        <div className="flex justify-between flex-col-reverse  mt-2 text-lg">
          <span className="font-bold">{items[0].price.toFixed(2)}$</span>
          <div className="flex items-center space-x-20">
            <span className="italic tracking-wide   text-[0.6rem] sm:text-[0.85rem]">
              Category: {items[0].category}
            </span>
            <span className="italic tracking-wide   text-[0.6rem] sm:text-[0.85rem]">
              Quantity: {items[0].quantity}x
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex  flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeFrombasket} className="button ">
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutItems;
