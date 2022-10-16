import React, { useContext } from "react";
import Image from "next/image";

import Link from "next/link";
import { StateContext } from "../context/context";

const ProductItem = ({ product }) => {
  const { handleAddToCart } = useContext(StateContext);
  return (
    <div className="card shadow-lg mb-5 rounded-lg border border-gray-200 flex  flex-col items-center justify-center">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <Link href={`/products/${product.id}`}>
          <a>
            <h2 className="text-lg">Name: {product.title}</h2>
          </a>
        </Link>
        <p className="mb-1 mt-1">Category: {product.category}</p>
        <p className="mb-2 text-md ">Price: ${product.price}</p>
        <button
          onClick={() => handleAddToCart(product)}
          className="btn mb-4 bg-yellow-500 text-black border-none hover:bg-yellow-400 duration-300 "
          type="button"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
