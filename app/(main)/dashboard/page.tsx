'use client';
import { signOut } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='min-h-screen py-20' style={{
      backgroundImage: 'url("/background (1).png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <div className='w-full max-w-2xl grid place-items-center mx-auto py-40 gap-6 bg-slate-50'>
        <span className='text-4xl tracking-wide font-semibold text-[#5D7DF3]'>
          Welcom to the Dashboard
        </span>
        <button onClick={() => signOut()} className="bg-slate-950 text-white rounded text-lg w-auto px-6 py-3 uppercase">
          Logout
        </button>
       
      </div>

    </div>
  )
}

export default Dashboard
