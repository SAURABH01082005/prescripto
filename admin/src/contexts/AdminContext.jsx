import axios from 'axios';
import React, { useState } from 'react'
import { createContext ,} from 'react'
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const  AdminContextProvider=(props)=>{
  const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
  const [doctors,setDoctors] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL//official use this no process.env

  const getAllDoctors = async ()=>{
    try{
      const {data} = await axios.post(`${backendUrl}/api/admin/all-doctor`,{},{
        headers:{   aToken   }});
        if(data.success){
          setDoctors(data.doctors)
          console.log(data.doctors);
        }
        else{
          toast.error(data.message)
        }


    }catch(err){
        toast.error(err.message)
    }
  }

  const changeAvailability = async (docId)=>{
    try{
      const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`,{doctorId: docId},{
        headers:{aToken}
      })
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }

    }catch(err){
      toast.error(err.message)
    }
  }
    const value ={
      aToken,setAToken,
      backendUrl,
      doctors,
      getAllDoctors,
      changeAvailability

    }
  return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider