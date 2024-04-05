'use client';
import React from 'react'
import ActionButtons from '../action-button'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className='flex items-center justify-between px-2 md:px-10 sticky top-0 z-40 bg-slate-500 py-4'>
      <div>
        {session?.user?.image !== undefined ? (
          <Link href='/dashboard'>
            <Image src={session.user?.image || '/default-image.jpg'} alt='image' width={40} height={40} className="rounded-full" />
          </Link>
        ) : (
          <Link href="/dashboard">
            <Image src="/knight.png" alt='image' width={40} height={40} className="rounded-full" />
          </Link>

        )}
      </div>
      {session && <span className="text-2xl tracking-normal font-semibold flex text-red-200"><p className='text-white'>Wlc:</p>{session.user?.name}</span>}
      <div>
        <ActionButtons />
      </div>
    </div>
  )
}

export default Navbar