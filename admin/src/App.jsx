import React, { useContext } from 'react'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './contexts/AdminContext';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import { Routes ,Route} from 'react-router';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDocter from './pages/Admin/AddDocter';
import DoctorList from './pages/Admin/DoctorList';

function App() {
  const {aToken} = useContext(AdminContext)

  return  aToken? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointments/>}/>
          <Route path='/add-doctor' element={<AddDocter/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
        </Routes>
      </div>
    </div>
  ):(
    <>
     <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
