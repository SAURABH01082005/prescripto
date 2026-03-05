import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../contexts/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

function DoctorAppointments() {
  const { getAppointments, appointments, setAppointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)



  //*adding patient to IPD
  const IDPHandler = async (item) => {

    const userData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/government/get-userdetails`, { userId: item.userId }, { headers: { dtoken: dToken } })
    if (!userData.data.success) {
      return toast.error(userData.data.message || "Patient addition Unsuccessfull")
    }

    const patientDetails = {
      "uniqueGovId": userData.data.userData._id + import.meta.env.VITE_HOSPITAL_ID,
      "uniqueGovAppointmentId": item._id + import.meta.env.VITE_HOSPITAL_ID,
      "name": userData.data.userData.name,
      "dob": new Date(userData.data.userData.dob),
      "address": userData.data.userData.address,
      "image": userData.data.userData.image,
      "gender": userData.data.userData.gender,
      "phone": userData.data.userData.phone
    }

    //checking if patient already exists
   
    const isAlreadyUser = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/government/get-patientdetails`, { patientAppointmentId: item._id.toString() + import.meta.env.VITE_HOSPITAL_ID }, { headers: { dtoken: dToken } })

    if (!isAlreadyUser.data.success) {
      return toast.error(isAlreadyUser.data.message)
    }


    const data1 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/government/get-docid`, { headers: { dtoken: dToken } })
    if (!data1.data.success) {
      return toast.error(data1.data.message || "Patient addition Unsuccessfull")

    }

    const reference = {
      "hospitalId": import.meta.env.VITE_HOSPITAL_ID,
      "patientId": userData.data.userData._id,
      "docId": data1.data.docId,

      "reason": "New Registration"
    }

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/government/add-patient`, { patientDetails, reference }, { headers: { dtoken: dToken } })
    if (!data.success) {
      return toast.error(data.message  || "Patient addition Unsuccessfull")
    }
    toast.success("Patient Registered to Government for IPD")
  }


  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          [...appointments].map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={item._id}>
              <p className='max-sm:hidden '>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <div className='flex gap-4'><p className='text-green-500 text-xs font-medium'>Completed</p> <img onClick={() => IDPHandler(item)} className='h-[20px] cursor-pointer hover:scale-125 hover:bg-primary border-0 rounded transition-transform' src={assets.addmit_icon} alt="" /></div>
                    : <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => { completeAppointment(item._id) }} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>

              }



            </div>
          ))
        }
      </div>
      <p className='mt-15 mb-5 text-lg font-medium  '>Notations</p>
      <div className=''>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all'>
            <img className='w-14' src={assets.cancel_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{ }</p>
              <p className='text-gray-400'>Cancel Appointment</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all'>
            <img className='w-14' src={assets.tick_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{ }</p>
              <p className='text-gray-400'>Complete Appointment</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all'>
            <img className='w-14' src={assets.addmit_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{ }</p>
              <p className='text-gray-400'>Refer to IPD</p>
            </div>
          </div>
        </div>




      </div>
    </div>
  )
}

export default DoctorAppointments