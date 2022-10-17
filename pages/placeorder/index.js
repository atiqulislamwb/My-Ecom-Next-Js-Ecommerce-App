import React, { useContext, useEffect, useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import Layout from "./../../components/Layout";
import CheckoutSteps from "./../../components/CheckoutSteps";
import { StateContext } from "./../../context/context";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import getError from "./../../utils/error";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);

  const {
    cart,
    updateQuantity,
    fullShippingInfo,
    selectedPaymentMethod,
    handleRemove,
  } = useContext(StateContext);
  const router = useRouter();
  const itemsPrice = cart.reduce((a, c) => a + c.quantity * c.price, 0);
  const shippingPrice = itemsPrice > 200 ? 20 : 0;
  const taxPrice = itemsPrice * 0.05;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("api/orders", {
        cart,
        fullShippingInfo,
        selectedPaymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      Cookies.set("fullData", JSON.stringify(data));

      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!selectedPaymentMethod) {
      router.push("/payment");
    }
  }, [selectedPaymentMethod, router]);

  return (
    <Layout title="Place Order">
      <CheckoutSteps activeStep={3} />
      <h1 className="text-2xl text-center m-3">Place Your Order </h1>
      {cart.length === 0 ? (
        <div>
          Cart is Empty <Link href="/">Go To Shopping</Link>
        </div>
      ) : (
        <div className="grid md;grid-cols-4 md:gap-4">
          <div className="overflow-x-auto md:col-span-3">
            <div className="w-full shadow-lg  mb-2 py-5 px-4 border border-slate-200">
              <h2 className="text-xl font-bold">Shipping address</h2>
              <div>
                {fullShippingInfo.fullName}, {fullShippingInfo.city},{" "}
                {fullShippingInfo.address}, {fullShippingInfo.postalCode},{" "}
                {fullShippingInfo.country}
              </div>
              <Link href="/shipping">
                <a className="text-blue-600 text-sm underline underline-offset-2">
                  Edit
                </a>
              </Link>
            </div>
          </div>
          <div className=" w-full border h-auto border-slate-200 shadow-lg -x-auto p-5">
            <h2>Order Items</h2>
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
            <div>
              <Link href="/cart">
                <a className="text-blue-600 text-sm underline underline-offset-2">
                  Edit
                </a>
              </Link>
            </div>
          </div>
          <div className=" shadow-lg border border-slate-200 p-2 ">
            <h2>Order Summary</h2>
            <ul>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Items</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between mb-2">
                  <div>Total Price</div>
                  <div>${totalPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="btn mb-4 bg-yellow-500 w-full  text-black border-none hover:bg-yellow-400 duration-300 "
                >
                  {loading ? "Loading " : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

PlaceOrder.auth = true;

export default PlaceOrder;
