import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const Unauthorized = () => {
  return (
    <Layout title="Unauthorized Page">
      <h1>Access Denied</h1>
      <div>
        <Link href="/login">
          <a className="text-2xl font-semibold underline text-offset-8 text-blue-600">
            Go To Login Page
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Unauthorized;
