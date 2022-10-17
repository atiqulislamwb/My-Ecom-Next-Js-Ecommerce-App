import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { StateContext } from "../../context/context";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import getError from "./../../utils/error";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
const Login = () => {
  const { data: session, status } = useSession();
  const { email, setEmail, password, setPassword } = useContext(StateContext);

  const handleLogin = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [session, router, redirect]);

  if (status === "loading") {
    return "Loading .....";
  }

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
        <button
          className="btn btn-warning"
          onClick={() => handleLogin(email, password)}
        >
          Log In
        </button>
        <div className="flex">
          <p className="text-sm ">Don't You have account ?</p>
          <Link href={`/register?redirect=${redirect || "/"}`}>
            <a className="-mt-1 text-lg underline ml-2 hover:text-blue-700 font-bold   text-blue-500  ">
              Register
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

// export default dynamic(() => Promise.resolve(Login), { ssr: false });
export default Login;
