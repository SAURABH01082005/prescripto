import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
// ;
import { useEffect ,useState} from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
  const [doctors,setDoctors] = useState([])
  const currencySymbol= '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL//official use this no process.env

    const value={    doctors  , currencySymbol  };

  const getDoctorsData= async ()=>{
    try{
      const {data} = await axios.get(`${backendUrl}/api/doctor/list`)
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }

    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  useEffect(()=>{
    getDoctorsData()
  },[])
   return (
     <AppContext.Provider value={value}>
         {props.children}
    </AppContext.Provider>
   );
}

export default AppContextProvider;