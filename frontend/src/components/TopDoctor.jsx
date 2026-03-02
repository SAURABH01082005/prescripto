import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function TopDoctor() {
    const navigate=useNavigate();
    const {doctors}=useContext(AppContext);
    // console.log("doctors is : ",doctors)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
        <h1 className=' text-3xl font-medium'>Top Doctors to Books</h1>
        <p className='sm:w-1/3 text-center text-sm'>Connect with highly rated specialists known for their expertise and exceptional patient care.</p>
        <div className='w-full grid grid-cols-(--grid-template-auto) gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>{
                return (
                    <div key={item._id} onClick={()=>{navigate(`./appointment/${item._id}`);scrollTo(0,0)}} className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500'>
                        <img src={item.image} className='bg-blue-50 ' alt="" />
                        <div className='p-4'>
                          <div className={`flex items-center gap-2 text-sm ${item.available? ' text-green-500' : 'text-gray-500'}`}>
                          <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available? 'Available' : 'Not Available'}</p>
                          </div>
                          <p className='text-gray-500 text-lg font-medium '>{item.name}</p>
                          <p className='text-gray-600 text-sm '>{item.speciality}</p>
                        </div>
                       
                    </div>
                )
            })}
        </div>
         <button onClick={()=>navigate("./doctor")} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctor