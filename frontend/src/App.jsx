import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Connections from './Components/Connections'
import Requests from './Components/Requests'
import { Provider } from 'react-redux'
import appStore from './Utils/appStore'
import Feed from './Components/Feed'
import Chat from './Components/Chat'

const App = () => {
  return (
    <div>
      <Provider store={appStore}>

        <BrowserRouter basename="/">
          <Routes>
            <Route path='/login' element={<Login />} />
            {/* children routes of Body  */}
            <Route path="/" element={<Body />} >
              <Route path='/' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<Requests />} />
              <Route path='/chat/:targetUserId' element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App