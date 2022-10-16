import "../styles/globals.css";
import { ContextProvider } from "../context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <ToastContainer position="top-center" hideProgressBar={true} />
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
