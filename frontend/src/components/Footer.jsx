import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ----------left side------------ */}
            <div>
                <img src={assets.logo} alt=""  className='mb-5 w-40'/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is a modern healthcare appointment platform developed by Saurabh Yadav, a Computer Engineering student and tech enthusiast. It enables seamless appointment booking, admin and doctor management, and secure online payments powered by Razorpay.
                </p>   
            </div>
            {/* ----------center side------------ */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li> Privacy Policy</li>
                </ul>

            </div>
            {/* ----------right side------------ */}

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-8591163765</li>
                    <li>saurabhyadav000@zohomail.in</li>
                </ul>

            </div>
        </div>
        {/* -----------------------------copy right------------ */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2026 Prescripto. All rights reserved. Developed by Saurabh Yadav.</p>

        </div>
    </div>
  )
}

export default Footer