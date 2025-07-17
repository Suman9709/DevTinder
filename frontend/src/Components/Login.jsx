import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from './constant';


const Login = () => {
  const [emailId, setEmailId] = useState("virat@kohli.com");
  const [password, setPassword] = useState("Virat@123");
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(addUser(response.data)) // this store the data in to the store
      navigate("/")

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='flex justify-center my-12'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>


          <div className='my-2'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter the email..." />

            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password" />

            </fieldset>
          </div>



          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login