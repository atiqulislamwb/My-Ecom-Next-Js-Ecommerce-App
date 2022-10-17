import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CheckoutSteps from "../../components/CheckoutSteps";
import Layout from "../../components/Layout";
import { StateContext } from "../../context/context";

const Payment = () => {
  const { selectedPaymentMethod, setSelectedPaymentMethod, cart } =
    useContext(StateContext);
  const router = useRouter();
  const handlePaymentClick = () => {
    if (!selectedPaymentMethod) {
      toast.error("Payment method not selected");
    }

    Cookies.set("payment", JSON.stringify({ selectedPaymentMethod }));
    router.push("/placeorder");
  };

  return (
    <Layout title="Shipping ">
      <CheckoutSteps activeStep={2} />
      <h1 className="text-2xl text-center m-3">Select Your Payment Method</h1>
      <div className="w-6/12 mx-auto flex flex-col mt-10 ">
        {["Paypal", "Stripe", "Cash On Delivery"].map((item) => (
          <div key={item} className="mb-3 ">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={item}
              type="radio"
              checked={selectedPaymentMethod === item}
              onChange={(e) => setSelectedPaymentMethod(item)}
            />
            <label className="p-2 text-lg mt-4 " htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
        <div className="flex  justify-between">
          <button className="btn btn-ghost bg-slate-200 mt-5">
            <Link href="/shipping">Back</Link>
          </button>
          <button
            onClick={handlePaymentClick}
            className="shadow-lg btn mr-20  btn-warning mt-6"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
