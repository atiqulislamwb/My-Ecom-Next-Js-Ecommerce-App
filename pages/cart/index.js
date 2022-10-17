import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { StateContext } from "../../context/context";
import { BsFillXCircleFill } from "react-icons/bs";
import dynamic from "next/dynamic";
const Cart = () => {
  const { cart, handleRemove, updateQuantity } = useContext(StateContext);

  const total = cart.reduce((a, c) => a + c.quantity * c.price, 0);
  const router = useRouter();

  return (
    <Layout title="Shopping Cart">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold mt-10 mb-2">Cart is Empty</p>
          <div className="py-2 underline underline-offset-8  text-blue-500">
            <Link href="/">Go Shopping</Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/products/${item.id}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.title}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item, e.target.value)}
                      >
                        {[...Array(item?.rating?.count).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-3xl hover:text-red-400 text-red-500"
                      >
                        <BsFillXCircleFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-2 mt-10 grid md:col-span-1  ">
            <ul>
              <li>
                <div className="pb-3 text-xl flex flex-col items-center justify-center h-[100px] shadow-lg  ">
                  Subtotal ({cart?.reduce((a, c) => a + c.quantity, 0)}
                  ): ${total.toFixed(2)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/login?redirect=/shipping")}
                  className="btn mb-4 bg-yellow-500 w-full  text-black border-none hover:bg-yellow-400 duration-300 "
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
