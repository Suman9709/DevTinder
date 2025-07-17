import React from 'react'
import { BASE_URL } from './constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import EditProfile from './EditProfile'


const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  )
}

export default Profile