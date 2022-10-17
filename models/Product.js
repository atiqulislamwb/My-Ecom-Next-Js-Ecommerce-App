import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 100 },
    },
  },

  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
