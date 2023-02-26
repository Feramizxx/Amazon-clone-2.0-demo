import { type } from "os";
import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/basketSlice";
type Props = {
  product: Product;
};

function SideBarProducItem({ product }: Props) {
  const dispatch = useDispatch();
  const iconComponents = [];
  for (let i = 0; i < Math.ceil(product.rating.rate); i++) {
    iconComponents.push(<StarIcon className="h-5 text-yellow-500" key={i} />);
  }
  return (
    <div className="flex  space-x-4 pt-4">
      <Image
        src={product.image}
        alt=""
        width={80}
        height={80}
        className="object-contain"
      />
      <div className="">
        <h1 className="line-clamp-2 text-blue-900">{product.title}</h1>
        <span className="flex ">{iconComponents}</span>
        <p className="line-clamp-2 text-red-700">{product.price.toFixed(2)}$</p>
        <button
          onClick={()=>dispatch(addToBasket(product))}
          className="button py-2 rounded-lg font-[500] text-[0.7rem]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SideBarProducItem;
