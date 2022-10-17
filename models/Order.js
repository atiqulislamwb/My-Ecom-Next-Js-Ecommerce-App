import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cart: [
      {
        title: { type: String },
        quantity: { type: Number },
        image: { type: String },
        price: { type: Number },
      },
    ],
    fullShippingInfo: {
      fullName: { type: String },
      city: { type: String },
      address: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },

    selectedPaymentMethod: { type: String },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliverAt: { type: Date },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
