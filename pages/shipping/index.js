import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import CheckoutSteps from "./../../components/CheckoutSteps";
import { StateContext } from "./../../context/context";
import Cookies from "js-cookie";

const Shipping = () => {
  const {
    cart,
    fullName,
    setFullName,
    city,
    setCity,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    country,
    setCountry,
    setFullShippingInfo,
  } = useContext(StateContext);
  const router = useRouter();
  const handleShippingClick = () => {
    const data = { fullName, city, address, postalCode, country };
    setFullShippingInfo(data);
    Cookies.set("shippingInfo", JSON.stringify({ data }));

    router.push("/payment");
  };

  return (
    <Layout title="Shipping ">
      <CheckoutSteps activeStep={1} />
      <h1 className="text-2xl text-center m-3">Shipping Address</h1>
      <div className="w-6/12 mx-auto flex items-center justify-center flex-col">
        <div className="w-full mt-3">
          <label className="input-group input-group-vertical">
            <span>Full Name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="input input-bordered"
              required
            />
          </label>
        </div>
        <div className="w-full mt-3">
          <label className="input-group input-group-vertical">
            <span>City</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="input input-bordered"
              required
            />
          </label>
        </div>
        <div className="w-full mt-3">
          <label className="input-group input-group-vertical">
            <span>Address</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="input input-bordered"
              required
            />
          </label>
        </div>
        <div className="w-full mt-3 flex gap-2">
          <div className="w-1/2 mt-3">
            <label className="input-group input-group-vertical">
              <span>Postal Code</span>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                type="text"
                className="input input-bordered"
                required
              />
            </label>
          </div>
          <div className="w-1/2 mt-3">
            <label className="input-group input-group-vertical">
              <span>Country</span>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                className="input input-bordered"
                required
              />
            </label>
          </div>
        </div>
        <button onClick={handleShippingClick} className="btn btn-warning mt-5">
          Next
        </button>
      </div>
    </Layout>
  );
};

export default Shipping;

Shipping.auth = true;
