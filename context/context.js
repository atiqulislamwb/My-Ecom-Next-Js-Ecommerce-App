import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const StateContext = createContext();

// const cartFromLocalStorage =
//   typeof window !== "undefined"
//     ? JSON.parse(window.localStorage.getItem("cart") || "[]")
//     : undefined;

const cartFromCookies = Cookies.get("cart")
  ? JSON.parse(Cookies.get("cart"))
  : [];

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromCookies);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};
  const handleAddToCart = (product) => {
    const isExist = cart?.find((p) => p.id === product.id);
    if (isExist) {
      const p = cart?.map((item) =>
        item.id === product.id
          ? { ...isExist, quantity: isExist.quantity + 1 }
          : item
      );
      setCart(p);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Product added successfully", { autoClose: 1000 });
  };

  const handleRemove = (id) => {
    const remain = cart.filter((item) => item.id !== id);
    setCart(remain);
    toast.error("Product deleted successfully", { autoClose: 1000 });
  };

  const handClearCart = () => {
    setCart([]);
    toast.error("Clear Cart Successfully", { autoClose: 200 });
  };

  const updateQuantity = (item, qty) => {
    const updateQty = Number(qty);

    const isExist = cart?.find((p) => p.id === item.id);
    if (isExist) {
      const p = cart?.map((it) =>
        it.id === item.id ? { ...isExist, quantity: updateQty } : it
      );
      setCart(p);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(cart))
    Cookies.set("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <StateContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        updateQuantity,
        handleRemove,
        handClearCart,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
