import React, { useState } from "react";
import SideBarProducItem from "./SideBarProducItem";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";
type Props = {
  products: Product[];
};

function SideBarProdcuts({ products }: Props) {
  const items = useSelector(selectBasketItems);
//   .filter((item) => item.category == items[0].category)
  return (
    <div className="mt-10">
      <div>
        <h1 className="font-bold text-lg">
          Customers Who Bought Items in Your Recent History Also Bought
        </h1>
        <div className="space-y-6 grid mx-auto gap-x-40 grid-cols-1 sm:grid-cols-2 lg:inline items-center">
          {products.slice(0,items.length+2).map((product) => {
              return <SideBarProducItem key={product.id} product={product} />;
            })} 
        </div>
      </div>
    </div>
  );
}

export default SideBarProdcuts;
