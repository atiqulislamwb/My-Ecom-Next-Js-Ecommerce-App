import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./../../components/Layout";
import getError from "./../../utils/error";
import axios from "axios";
import { SpinnerRoundOutlined } from "spinners-react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import stripe from "../../utils/stripe.png";
import { loadStripe } from "@stripe/stripe-js";

import { Checkout } from "../../components/Checkout";
const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`/api/orders/${id}`);
        setLoading(false);
        setOrder(data?.data);
      } catch (error) {
        setLoading(false);
        toast.error(getError(error));
      }
    };

    fetchOrder();
  }, [id]);

  const {
    fullShippingInfo,
    cart,
    selectedPaymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    deliverAt,
  } = order;

  const totalItemQuantity = order?.cart?.reduce((a, c) => a + c.quantity, 0);

  const handleCheckout = async () => {
    let stripePromise = null;
    const getStripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
      }
      return stripePromise;
    };
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [
        {
          price: JSON.stringify(totalPrice),
          quantity: totalItemQuantity,
        },
      ],
      mode: "subscription",
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });
  };

  if (loading)
    return (
      <div className="">
        <SpinnerRoundOutlined />
      </div>
    );

  return (
    <Layout title={`Order Details-${id}`}>
      <h1 className="mb-4 text-xl">{`Order ${order?._id}`}</h1>

      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="w-full mt-5 shadow-lg border border-slate-300  p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {fullShippingInfo?.fullName}, {fullShippingInfo?.address},{" "}
              {fullShippingInfo?.city}, {fullShippingInfo?.postalCode},{" "}
              {fullShippingInfo?.country}
            </div>
            {deliverAt ? (
              <div className="bg-green-600 text-black p-2 mt-3 rounded-md">
                Delivered at {deliverAt}
              </div>
            ) : (
              <div className="bg-red-500 text-white p-2 mt-3 rounded-md">
                Not delivered
              </div>
            )}
          </div>

          <div className="w-full mt-5 shadow-lg border border-slate-300  p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{selectedPaymentMethod}</div>
            {isPaid ? (
              <div className="bg-green-600 text-black p-2 mt-3 rounded-md">
                Paid at {paidAt}
              </div>
            ) : (
              <div className="bg-red-500 text-white p-2 mt-3 rounded-md">
                Not paid
              </div>
            )}
          </div>

          <div className="w-full mt-5 shadow-lg border border-slate-300  overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="    p-5 text-right">Quantity</th>
                  <th className="  p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <Link href={`/product/${item._id}`}>
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
                    <td className=" p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-right">
                      ${item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="w-full mt-5 overflow-y-auto shadow-lg border border-slate-300  p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>{" "}
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <button onClick={handleCheckout}>
                  <a className="w-10 h-10 object-fit">
                    <Image
                      src={stripe}
                      alt="stripe-button"
                      className="w-20  h-10 object-contain shadow-lg  rounded-lg"
                    />
                  </a>
                </button>
              </li>
              {/* {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="primary-button w-full"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )} */}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
