import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "./../../components/Layout";
import { signIn } from "next-auth/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = async () => {
    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Register failed");
      console.log(error);
    }
  };

  return (
    <Layout title="Register">
      <div className="flex mt-32 flex-col items-center gap-6 justify-center">
        <p className="font-mono text-3xl tex-black font-bold">Register</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="input input-bordered input-warning w-full max-w-xs"
        />
        <button onClick={handleRegister} className="btn btn-secondary">
          Register
        </button>
        <div className="flex">
          <p className="text-sm ">Already registered?</p>
          <Link href="/login">
            <a className="-mt-1 text-lg underline ml-2 hover:text-blue-700 font-bold   text-blue-500  ">
              Login
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
