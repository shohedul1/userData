import React from 'react'
import Navbar from '../components/navbar/navbar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default layout