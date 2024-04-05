'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";

interface DropDrownMenuProps {
    onClose: () => void;
}



const DropdrownMenu: React.FC<DropDrownMenuProps> = ({ onClose }) => {
    const handleLinkClick = () => {
        onClose();
    }
    return (
        <div className="h-screen w-[200px] bg-gray-500 px-10 items-center justify-center absolute top-[80px] right-0 md:hidden ">

            <div className="flex items-center justify-between flex-col gap-[20px]  pt-[50px]">
                <Link href={"/dashboard/create"} onClick={handleLinkClick}>
                   <div className="text-white text-2xl hover:text-yellow-300">Create</div>
                </Link>
                <button onClick={() => signOut()} className=" text-white text-2xl">
                    Logout
                </button>
            </div>

        </div>
    )
}

export default DropdrownMenu;