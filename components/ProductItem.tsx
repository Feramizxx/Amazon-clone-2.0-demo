import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { forEachChild } from "typescript";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addToBasket } from "@/redux/basketSlice";
type Props = {
  product: Product;
  quantity: number;
};

function ProductItem({ product, quantity }: Props) {
  const dispatch = useDispatch();
  const iconComponents = [];
  for (let i = 0; i < Math.ceil(product.rating.rate); i++) {
    iconComponents.push(<StarIcon className="h-5 text-yellow-500" key={i} />);
  }
  const onAddToBasketHandler = () => {
    dispatch(addToBasket({ ...product, quantity }));
  };
  return (
    <div className="relative flex flex-col  m-5 p-10 bg-white z-30">
      <Link href={`/products/${product.id}`}>
        <p className="absolute top-2 right-8 text-xs italic text-gray-400">
          {product.category}
        </p>
        <Image
          src={product.image}
          alt={product.title}
          className="mx-auto object-contain h-64 "
          width={250}
          height={0}
        />
        <h4 className="my-3 line-clamp-2">{product.title}</h4>
        <div className="flex items-center">{iconComponents}</div>
        <p className="text-xs my-2 line-clamp-2">{product.description}</p>

        <div className="mb-5">
          <p className="">{product.price.toFixed(2)}$</p>
        </div>
        </Link>
     

      <button onClick={onAddToBasketHandler} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default ProductItem;

{
  /* <Image src={product.image} alt={product.title} width={200} height={150} />

<h4>{product.title}</h4>

<div className="flex items-center">{iconComponents}</div>

<p>{product.description}</p>

<div>
  <p>{product.price.toFixed(2)}$</p>
</div>

{prime && (
  <div>
    <img src="https://links/papareact.com/fdw" alt="" />
  </div>
)} */
}
