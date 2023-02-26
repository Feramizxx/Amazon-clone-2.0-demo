import React from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  products: Product[];
  quantity: number;
};

function ProductFedd({ products, quantity }: Props) {
  let router = useRouter();

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductItem quantity={quantity} key={product.id} product={product} />
      ))}
      <div className="md:col-span-full">
        <img src="https://links.papareact.com/dyz" alt="" />
      </div>
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductItem quantity={quantity} key={product.id} product={product} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <ProductItem quantity={quantity} key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductFedd;
