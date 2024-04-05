"use client";

import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const intialValue = {
    name: "",
    email: "",
    password: "",
}
const Signup = () => {
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
        console.log(user);
        try {
            if (!user.name || !user.email || !user.password) {
                setError("please fill all the fields");
                return;
            }
            const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
            if (!emailRegex.test(user.email)) {
                setError("invalid email id");
                return;
            }
            const res = await axios.post("/api/register", user);
            console.log(res.data);
            if (res.status == 200 || res.status == 201) {
                console.log("user added successfully");
                setError("");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            setError("");
        } finally {
            setLoading(false);

            setUser(intialValue);
        }
    };
    const div1 = 'flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-black';
    const signunTitele = 'mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100';
    const signinDiv = 'sm:mx-auto sm:w-full sm:max-w-sm';
    const div2 = "mt-10 sm:mx-auto sm:w-full sm:max-w-sm";
    const commonLabel = 'block text-sm font-medium leading-6 text-gray-100';
    const commonInput = "block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    const submitButton = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    const loginButton = "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";
    const signUpPage = "rounded py-2 w-full px-6 shadow cursor-pointer bg-gray-50 grid place-items-center mx-auto mb-4"
    return (
        <div className={div1}>
            <div className={signinDiv}>
                <h2 className={signunTitele}>
                    Sign Up to your account
                </h2>
            </div>

            <div className={div2}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className={commonLabel}>
                            Fullname
                        </label>
                        <div className="mt-2">
                            <input
                                name="name"
                                type="text"
                                value={user.name}
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                                
                                className={commonInput}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={commonLabel}>
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type="email"
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
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleInputChange}
                                
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
                            {loading ? 'Proccing....' : 'register'}
                        </button>
                        <div className="flex justify-center w-full items-center gap-3 py-3">
                            <div className="border-b border-gray-100 py-2 w-full px-6" />
                            <div className="mt-3 text-white">or</div>
                            <div className="border-b border-gray-100 py-2 w-full px-6" />
                        </div>
                        <div className="flex justify-center items-center w-full gap-8">

                            <div onClick={() => signIn("google")} 
                            className={signUpPage}>
                                <FcGoogle className="w-[30px] h-[30px]" />
                            </div>{" "}

                        </div>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-200">
                    Have an account?{' '}
                    <Link href="/" className={loginButton}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;