"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const intialValue = {
    name: '',
    age: '',
    address: '',
    work: ''
}

const Create = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");
    const [userdata, setUserdata] = useState(intialValue);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        return setUserdata((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
   
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        console.log(userdata);
        try {
            if (!userdata.name || !userdata.age || !userdata.address || !userdata.work) {
                setError("Please fill all the fields");
                return;
            }
            const response = await fetch("/api/userdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userdata),
            });
    
            // Check if response status is ok (2xx range)
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
    
            // Check if response contains data before parsing as JSON
            const data = response.status === 204 ? {} : await response.json();
            console.log(data);
            
            console.log("User added successfully");
            setError("");
            router.push("/dashboard");
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to add user");
        } finally {
            setLoading(false);
            // setUserdata(intialValue);
        }
    };
    
  
    

    const div1 = 'flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-black';
    const signunTitele = 'mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100';
    const signinDiv = 'sm:mx-auto sm:w-full sm:max-w-sm';
    const div2 = "mt-10 sm:mx-auto sm:w-full sm:max-w-sm";
    const commonLabel = 'block text-sm font-medium leading-6 text-gray-100';
    const commonInput = "block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    const submitButton = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    return (
        <div className={div1}>
            <div className={signinDiv}>
                <h2 className={signunTitele}>
                    User create data
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
                                value={userdata.name}
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                                className={commonInput}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={commonLabel}>
                            Age
                        </label>
                        <div className="mt-2">
                            <input
                                name="age"
                                type="number"
                                placeholder="Enter your age"
                                value={userdata.age}
                                onChange={handleInputChange}
                                className={commonInput}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={commonLabel}>
                            Address
                        </label>
                        <div className="mt-2">
                            <input
                                name="address"
                                type="text"
                                placeholder="Enter your address"
                                onChange={handleInputChange}
                                value={userdata.address}
                                className={commonInput}
                            />
                        </div>
                    </div>


                    <div>
                        <div className="flex items-center justify-between">
                            <label className={commonLabel}>
                                Work
                            </label>
                        </div>
                        <div className="mt-2 relative flex items-center">
                            <input
                                name="work"
                                type={'text'}
                                placeholder="Enter your work"
                                onChange={handleInputChange}
                                value={userdata.work}
                                className={commonInput}
                            />

                        </div>
                    </div>

                    <div>
                        {error && <p className="pb-4 text-lg text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className={submitButton}
                        >
                            {loading ? 'proccing' : 'submit'}
                        </button>


                    </div>
                </form>


            </div>
        </div>
    );
};

export default Create;