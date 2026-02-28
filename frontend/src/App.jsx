import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Doctor from './pages/Doctor'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/doctor/:speciality' element={<Doctor />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myappointment' element={<MyAppointment />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
        <Footer />
      </div>

    </>
  )
}

export default App
