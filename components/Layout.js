import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title : "My Ecom-Next js Ecommerce app"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <Navbar />
        </header>
        <main className="container p-4 m-auto mt-5">{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
