import React, { use, useContext } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useState } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function AddDocter() {

  const [docImg, setDocImg] = useState(false)
  const [docName, setDocName] = useState('')
  const [docEmail, setDocEmail] = useState('')
  const [docPassword, setDocPassword] = useState('')
  const [docExperience, setDocExperience] = useState("1 Year")
  const [docFees, setDocFees] = useState('')
  const [docSpeciality, setDocSpeciality] = useState('General physician')
  const [docEducation, setDocEducation] = useState('')
  const [docAddress1, setDocAddress1] = useState('')
  const [docAddress2, setDocAddress2] = useState('')
  const [docAbout, setDocAbout] = useState('')

  const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try{
      if(!docImg){
        return toast.error('Please upload doctor image')
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', docName);
      formData.append('email', docEmail);
      formData.append('password', docPassword);
      formData.append('experience', docExperience);
      formData.append('fees', docFees);
      formData.append('speciality', docSpeciality);
      formData.append('degree', docEducation);
      formData.append('address', JSON.stringify({line1: docAddress1, line2: docAddress2}));
      formData.append('about', docAbout);

      //console.log([...formData])
      // formData.forEach((value, key) => {
      //   console.log(key + ': ' + value);
      // });

      const {data}=await axios.post(`${backendUrl}/api/admin/add-doctor`, formData,{
        headers:{
          aToken
          
        }
      })
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setDocName('')
        setDocEmail('')
        setDocPassword('')
        setDocExperience("1 Year")
        setDocFees('')
        setDocSpeciality('General physician')
        setDocEducation('')
        setDocAddress1('')
        setDocAddress2('')
        setDocAbout('')
      }
      else{
        toast.error(data.message)
      }
      


    }catch(err){
      toast.error(err.message);
      console.log(err);

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full border-primary-border">

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll border-[var(--color-primary-border)]'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id='doc-img' hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e)=>setDocName(e.target.value)} value={docName} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor email</p>
              <input onChange={(e)=>setDocEmail(e.target.value)} value={docEmail} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor password</p>
              <input onChange={(e)=>setDocPassword(e.target.value)} value={docPassword} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setDocExperience(e.target.value)} value={docExperience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setDocFees(e.target.value)} value={docFees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>

          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setDocSpeciality(e.target.value)} value={docSpeciality} className='border rounded px-3 py-2' name="speciality" id="speciality">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=>setDocEducation(e.target.value)} value={docEducation} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Adress</p>
              <input onChange={(e)=>setDocAddress1(e.target.value)} value={docAddress1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
              <input onChange={(e)=>setDocAddress2(e.target.value)} value={docAddress2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required />
            </div>

          </div>
        </div>

        <div >
          <p className='mt-4 mb-2 '>About Doctor</p>
          <textarea onChange={(e)=>setDocAbout(e.target.value)} value={docAbout} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write about doctor' rows={5} required />
        </div>
        <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>
    </form>
  )
}

export default AddDocter