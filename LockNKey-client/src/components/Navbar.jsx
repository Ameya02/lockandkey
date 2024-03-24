import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  console.log(import.meta.env.VITE_API_URL)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [loggedIn, setLoggedIn] = useState(user ? true : false)  
  const logout = () => {
    localStorage.removeItem('user')
    setLoggedIn(false)
    navigate('/login')
  }
  useEffect(()=>{},[loggedIn])
  return (
    <div className="bg-lavender w-[1440px]  overflow-hidden shrink-0 flex flex-row items-center justify-between py-2 px-[98px] box-border z-[0]">
    <div className="relative w-[130.18px] h-6">
    <b className="absolute top-[0px] left-[0px] tracking-[0.15px] leading-[24px] inline-block w-[130.18px]cursor-pointer" >{`Lock & Key`}</b>
    </div>
    <div className="flex flex-row items-center justify-start gap-[48px] text-center text-base font-inter">
    <Link to={"/"}>
      <b className="relative tracking-[0.5px] leading-[24px] cursor-pointer" >Home</b>
      </Link>
      <Link to={"/aboutus"}>
      <div
        className="relative tracking-[0.5px] leading-[24px] cursor-pointer"
      >
        About Us
      </div>
      </Link>
      <div className="relative tracking-[0.5px] leading-[24px]">
        Contact
      </div>
      <div
        className="rounded-31xl bg-darkblue overflow-hidden flex flex-row items-center justify-center py-3 px-5 cursor-pointer text-left text-lavender border-[1px] border-solid border-neutral-10"
      >
      {!loggedIn ? (
          <Link to={"/signup"}>
        <div className="relative tracking-[0.5px] leading-[24px] cursor-pointer" >
          Sign up
        </div>
        </Link>
      ):( <div onClick={logout} className="relative tracking-[0.5px] leading-[24px] cursor-pointer" >
          Logout
        </div>)
      }
      </div>
    </div>
  </div>
  )
}

export default Navbar