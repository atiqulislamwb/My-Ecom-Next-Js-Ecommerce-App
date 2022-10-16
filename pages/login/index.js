import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { StateContext } from "../../context/context";

const Login = () => {
  const { email, setEmail, password, setPassword, handleLogin } =
    useContext(StateContext);
  return (
    <Layout title="Login">
      <div className="flex mt-32 flex-col items-center gap-6 justify-center">
        <p className="font-mono text-3xl tex-black font-bold">Log In</p>

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <button className="btn btn-warning" onClick={handleLogin}>
          Log In
        </button>
        <div className="flex">
          <p className="text-sm ">Don't You have account ?</p>
          <Link href="/register">
            <a className="-mt-1 text-lg underline ml-2 hover:text-blue-700 font-bold   text-blue-500  ">
              Register
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
