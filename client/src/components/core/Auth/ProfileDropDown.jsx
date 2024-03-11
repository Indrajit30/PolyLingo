import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { RiArrowDropDownLine } from 'react-icons/ri'
import { logout } from '../../../services/operations/authAPI'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const navigate = useNavigate();
  // useOnClickOutside(ref, () => setOpen(false));

  // console.log("user",user);
  return (
    <button className='relative' onClick={()=>setOpen(!open)}>
      <div className='flex items-center gap-4'>
        <img className='bg-white rounded-full border-[2px]  border-white' height={40} width={40} src={user.image} alt="" />
        <RiArrowDropDownLine className='h-[30px] w-[30px]' fill='white'/>
      </div>

      {open && ((
        <div
        // onClick={(e) => e.stopPropagation()}
        className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        // ref={ref}
        >
          <Link to='dashboard/my-profile' onClick={() => setOpen(!setOpen)}>
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      ))}

    </button>
  )
}

export default ProfileDropDown