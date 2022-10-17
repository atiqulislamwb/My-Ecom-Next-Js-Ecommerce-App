import React from "react";

const CheckoutSteps = ({ activeStep = 0 }) => {
  return (
    <div className="flex flex-wrap mb-10">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  text-center ${
              index <= activeStep
                ? "border-yellow-400 text-yellow-400"
                : "border-slate-400 mb-2 text-gray-400"
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
