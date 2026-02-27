import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ----------left side------------ */}
            <div>
                <img src={assets.logo} alt=""  className='mb-5 w-40'/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi deserunt praesentium laboriosam non minima distinctio facilis quisquam tempora quis, doloremque cum provident ad incidunt harum exercitationem hic neque dolorem cumque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, similique. loerm10
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
                    <li>+91-93475398357</li>
                    <li>greatstack@mail.com</li>
                </ul>

            </div>
        </div>
        {/* -----------------------------copy right------------ */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis id molestiae numquam eius, placeat commodi labore dolorum cumque, quos error iste repellat velit. Voluptas officiis quod odio nulla expedita facere?</p>

        </div>
    </div>
  )
}

export default Footer