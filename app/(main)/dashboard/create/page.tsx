"use client";

const Signup = () => {
   
   
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
                <form className="space-y-6" >
                    <div>
                        <label className={commonLabel}>
                            Fullname
                        </label>
                        <div className="mt-2">
                            <input
                                name="name"
                                type="text"
                               
                                placeholder="Enter your name"
                               
                                
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
                                type={ 'text'}
                                placeholder="Enter your work"
                              
                                
                                className={commonInput}
                            />
                            
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={submitButton}
                        >
                            submit
                        </button>
                       
                       
                    </div>
                </form>

              
            </div>
        </div>
    );
};

export default Signup;