"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const intialValue = {
  email: "",
  password: "",
}
const Login = () => {
  const [lock, setLock] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState(intialValue);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("invalid email id");
        return;
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setError("error");
      }

      setError("");
      router.push("/dashboard");
      console.log(user)

    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);
      setUser(intialValue);
    }
  };
  const div1 = "flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-black";
  const signinTitele = "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100";
  const commonLabel = "block text-sm font-medium leading-6 text-gray-100";
  const commonInput = "block w-full px-4 py-1.5 placeholder:text-center placeholder:text-yellow-500 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const submitButton = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const gooleSigin = 'rounded py-2 w-full px-6 shadow cursor-pointer bg-gray-50 grid place-items-center mx-auto mb-4';
  const signupPage = "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";
  return (
    <div className={div1}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={signinTitele}>
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={commonLabel}>
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type={'email'}
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputChange}
                
                className={commonInput}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className={commonLabel}>
                Password
              </label>
            </div>
            <div className="mt-2 relative flex items-center">
              <input
                name="password"
                type={lock ? 'password' : 'text'}
                onChange={handleInputChange}
                value={user.password}
                placeholder="********"
                className={commonInput}
              />
              <div className="absolute top-2 right-2">
                {lock ? (
                  <FaLock
                    onClick={() => setLock(false)}
                    className="text-light-rayish-cyan cursor-pointer"
                  />
                ) : (
                  <FaUnlockAlt
                    onClick={() => setLock(true)}
                    className="text-light-rayish-cyan cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
          {error && <p className="pb-4 text-lg text-red-500">{error}</p>}
            <button
              type="submit"
              className={submitButton}
            >
              {loading ? "Proccing..": 'Sign in'}
            </button>
            <div className="flex justify-center w-full items-center gap-3 py-3">
              <div className="border-b border-gray-100 py-2 w-full px-6" />
              <div className="mt-3 text-white">or</div>
              <div className="border-b border-gray-100 py-2 w-full px-6" />
            </div>
            <div className="flex justify-center items-center w-full gap-8">

              <div
                onClick={() => signIn("google")}
                className={gooleSigin}>
                <FcGoogle className="w-[30px] h-[30px]" />
              </div>{" "}

            </div>
          </div>


        </form>

        <p className="mt-10 text-center text-sm text-gray-200">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className={signupPage}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;