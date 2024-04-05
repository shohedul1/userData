'use client';
import React, { useState } from "react";
import { X, AlignJustify } from "lucide-react";
import Link from "next/link";
import DropdrownMenu from "./drop-down-menu";
import { signOut } from "next-auth/react";


const ActionButtons = () => {
    const [isDropdownVisible, setDropdownVisble] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisble(!isDropdownVisible);
    }

    const closeDropdown = () => {
        setDropdownVisble(false);
    }

    return (
        <div className="flex items-center justify-between gap-5">
            <div className="md:flex items-center justify-between gap-5 hidden">
                <Link href={"/dashboard/create"} >
                    <div className="text-white text-2xl">Create</div>
                </Link>
               
                <button onClick={() => signOut()} className="bg-slate-950 text-white rounded text-lg w-auto px-2 py-1 uppercase">
                    Logout
                </button>
            </div>
            <div>
                {isDropdownVisible && (
                    <div
                        onClick={toggleDropdown}
                        className="bg-[#565add] p-3 rounded-full md:hidden"
                    >
                        <X className="w-6 h-6 text-[#eff0ff] text-center justify-center rounded-full" />
                    </div>
                )}

                {!isDropdownVisible && (
                    <div
                        onClick={toggleDropdown}
                        className="bg-[#eff0ff] p-3 rounded-full xl:hidden"
                    >
                        <AlignJustify className="w-6 h-6 text-[#565add] text-center justify-center rounded-full" />
                    </div>
                )}

                {isDropdownVisible && (
                    <DropdrownMenu onClose={closeDropdown} />
                )}
            </div>
        </div>
    )
}

export default ActionButtons