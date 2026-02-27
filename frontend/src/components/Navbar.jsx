import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import  {NavLink}  from 'react-router'
import { useNavigate } from 'react-router'
function Navbar() {
    const [showMenu,setShowMenu]=useState(false);
    const [token,setToken]=useState(true);
    const navigate=useNavigate();
  return (
    <div className=' flex items-center justify-between text-sm py-4 mb-5 border-b  border-gray-400 '>
        <img src={assets.logo} onClick={()=>navigate("/")}  alt="logo" className=' w-44 cursor-pointer ' />
        <ul  className=' hidden md:flex item-start gap-5 font-medium'>
            <NavLink to="./" ><li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="./doctor"><li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to={"./about"}><li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to={'./contact'}><li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4' >
            {
            token
            ? <div className='flex items-center gap-2 cursor-pointer  relative group '>
                <img src={assets.profile_pic} className='w-8 rounded-full' alt="profile_pic" />
                <img src={assets.dropdown_icon} className ="w-2.5 " alt="dropdown_icon" />
                <div className='absolute top-0 right-0 font-medium pt-14 text-base text-gray-600 z-20 hidden group-hover:block '>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>navigate("./myprofile")} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate("./myappointment")} className='hover:text-black cursor-pointer'>My Appointment</p>
                    <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>:<button className='bg-(--color-primary) text-white py-2 px-3  md:py-3 md:px-8 rounded-full font-light  md:block cursor-pointer' onClick={()=>navigate("./login")}>Create Account</button>//not hidden
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* mobile menu */}
            <div className={`${showMenu? 'fixed h-full  w-full':"h-0 w-0"} testing md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between  px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium'>
                    <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className={"px-4 py-2 rounded inline-block"}>Home</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to='/doctor'><p className={"px-4 py-2 rounded inline-block"}>All Doctors</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/about'}><p className={"px-4 py-2 rounded inline-block"}>About</p></NavLink>
                    <NavLink  onClick={()=>setShowMenu(false)} to={'/contact'}><p className={"px-4 py-2 rounded inline-block"}>Contact</p></NavLink>
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Navbar



