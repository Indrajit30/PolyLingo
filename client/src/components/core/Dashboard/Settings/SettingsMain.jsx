import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'


function SettingsMain() {
  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-richblack-5 text-3xl '>Edit Profile</h1>
      <ChangeProfilePic></ChangeProfilePic>
      <EditProfile></EditProfile>
    </div>
  )
}

export default SettingsMain