import React from 'react'
import parach from '../assets/image/Parach-computers-ibadan-logo-1-e1565984209812-157x49.png'

export default function Footer() {
  return (
    <div className='min-h-10vh'>
        <div className=' flex justify-between  bg-gray-900 px-10  '>
            <img src={parach} alt="" />
        <p className='text-white'>© Abdulazeez {new Date().getUTCFullYear()}  </p>
        </div>
      
    </div>
  )
}
