import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'


const App = () => {
  return (
    <div>

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
          {/* children routes of Body  */}
            <Route path='/login' element={<Login/>}  />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App