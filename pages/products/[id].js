import React, { useContext } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { StateContext } from "../../context/context";
const ProductDetail = ({ product }) => {
  const { handleAddToCart } = useContext(StateContext);

  console.log(product);
  if (!product)
    return (
      <div className="flex items-center justify-center">Product Not Found</div>
    );
  return (
    <Layout title={product.title}>
      <div className="py-2 underline underline-offset-8  text-blue-500">
        <Link href="/">Back To Products</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            layout="responsive"
            src={product.image}
            alt={product.title}
            width={640}
            height={640}
          />
        </div>
        <div className="mt-5">
          <h2 className="text-lg">Name: {product.title}</h2>

          <p className="mb-1 mt-1">Category: {product.category}</p>

          <p className="mb-2 text-lg ">Price: ${product.price}</p>
          <p className="mb-2 text-lg ">Rating: {product?.rating?.rate} of 5</p>

          <p className="mb-2 text-md text-slate-500 ">
            Description: {product.description}
          </p>
        </div>
        <div className="p-5 shadow-lg h-[210px] mb-5 rounded-lg border border-gray-200 flex  flex-col">
          <div className="mb-2 flex justify-between mt-6">
            <p>Price</p>
            <p>${product.price}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product?.rating?.count > 0 ? "In Stock" : "Unavailable"}</div>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="btn mt-10 mb-4 bg-yellow-500 text-black border-none hover:bg-yellow-400 duration-300 "
            type="button"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  const data = await axios.get("https://fakestoreapi.com/products");
  const paths = data?.data?.map((item) => {
    return {
      params: { id: `${item.id}` },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;
  const data = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return {
    props: { product: data?.data },
  };
}
