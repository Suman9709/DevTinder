import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from './constant';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(false);
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
      setError(error?.response?.data || "Something went wrong")
      console.error(error)
    }

  }


  const handleSignUp = async () => {
    try {
      const response = await axios.post(BASE_URL + "/signup", {
        firstName, lastName, emailId, password
      },
        {
          withCredentials: true,
        })
      dispatch(addUser(response.data.data))
      navigate("/profile")
    } catch (error) {
      setError(error?.response?.data)
    }
  }
  return (
    <div className='flex justify-center my-18'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>


          <div>

            {!isLoginForm && <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter the email..." />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter the email..." />
              </fieldset>
            </>}



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


          <p className='text-red-700'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SIgnUp"}</button>
          </div>
          <p className='text-center cursor-pointer py-2' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? SignUp Here" : "Existing user? Login Here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login