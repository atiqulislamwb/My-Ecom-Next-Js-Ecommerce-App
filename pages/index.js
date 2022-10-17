import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem.jsx";
import axios from "axios";

export default function Home({ products }) {
  return (
    <div>
      <Layout title="Home page">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const data = await axios.get("https://fakestoreapi.com/products");
  return {
    props: {
      products: data?.data,
    },
  };
}
