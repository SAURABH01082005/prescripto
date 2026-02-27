import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

export default function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi commodi sequi laboriosam deleniti exercitationem totam voluptatem modi, dolorum qui quasi.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, quam ullam error sapiente deleniti, quos fugiat temporibus, optio dolores corrupti quaerat nemo nulla similique!</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque culpa dignissimos iusto sed, assumenda eum deleniti doloribus voluptates, eius esse ea impedit. Qui blanditiis, provident deleniti maiores nostrum nisi placeat illum? Iure voluptate quam obcaecati molestiae odit officiis consequatur, veritatis ipsam et ipsa unde? Doloremque expedita voluptate nemo dolor, asperiores illum, laborum eligendi quia exercitationem delectus accusamus! Quaerat libero dolorem natus a vel, rerum quos itaque. Inventore exercitationem odio nihil!</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p >WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta eaque delectus dignissimos vero! Voluptatibus, minima?</p>
      </div>
      
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Convenience:</b>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, provident sapiente debitis obcaecati sint labore!</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Personalization:</b>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias incidunt cupiditate eum repellendus fuga pariatur.</p>
      </div>
      </div>
    </div>
  )
}
