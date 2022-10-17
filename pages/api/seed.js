import User from "../../models/User.js";
import db from "../../utils/db.js";
import data from "../../utils/data.js";
import Product from "../../models/Product.js";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  //   await Product.deleteMany();
  //   await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "seed successfully" });
};

export default handler;
