import Head from "next/head";
import Header from "@/components/Header";
import ProductFedd from "@/components/ProductFedd";
import Banner from "@/components/Banner";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";

type Props = {
  products: Product[];
};

export default function Home({ products }: Props) {
  
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Header */}
        <Header />
        <main className="max-w-screen-2xl mx-auto">
          {/* Banner */}
          <Banner />
          <ProductFedd quantity={0} products={products} />
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();
  return {
    props: { products },
  };
};
