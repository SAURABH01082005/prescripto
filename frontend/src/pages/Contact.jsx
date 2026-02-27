import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

export default function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center gap-6'>
          <p className='text-gray-600 font-semibold text-lg'>Our Office</p>
          <p className='text-gray-500'>0948 ALHREFG ASGEG <br />hrdfgfgfdg g d</p>
          <p className='text-gray-500'>Tel: +91 5456 5667 <br />Email:dfsdshdsh@mail.in</p>
          <p className='text-gray-600 font-semibold text-lg'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about job openings in our team</p>
           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}
