import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import { selectTotalItems } from "@/redux/basketSlice";
import CheckoutItems from "@/components/CheckoutItems";
import SideBarProdcuts from "@/components/SideBarProdcuts";
import { GetServerSideProps } from "next";

type Props = {
  products: Product[];
};

function Checkout({ products }: Props) {

  const items = useSelector(selectBasketItems);
  const total = useSelector(selectTotalItems);
  const [groupedBasketItems, setGroupedBasketItems] = useState<{
    [id: number]: Product[];
  }>({});
  const session = useSession();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {} as { [id: number]: Product[] });
    setGroupedBasketItems(groupedItems);
  }, [items]);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto lg:space-x-3">
        <div className="flex-grow shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt=""
          />
          <div className="flex flex-col bg-white p-5 space-y-10">
            <h1 className="text-3xl  border-b pb-4">Shopping Basket</h1>
            {items.length > 0 && groupedBasketItems
              ? Object.entries(groupedBasketItems).map(([id, items]) => (
                  <CheckoutItems quantity={0} key={id} items={items} />
                ))
              : []}
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col bg-white shadow-md p-10">
            <div>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span>{total.toFixed(2)}$</span>
              </h2>
              <button
                disabled={!session.data}
                className={`button w-full rounded-sm mt-2 ${
                  !session.data &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session.data ? "Sign in to chechkout" : "Proceed to checkout"}
              </button>

              <SideBarProdcuts products={products} />

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();
  return {
    props: { products },
  };
};
