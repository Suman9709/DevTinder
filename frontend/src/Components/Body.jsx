import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from './constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/userSlice'
import Login from './Login'



const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        if (userData) return;
        try {
            const response = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            console.log(response.data);

            dispatch(addUser(response.data));
        } catch (error) {
            if (error.status === 401) {

                navigate("/login")
            }
            console.error(error)
        }
    };
    //this will fetch the user when the component load
    useEffect(() => {

        fetchUser()
    }, [])
     if (!userData?.emailId) {
        return <Login />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                <Navbar />
                <Outlet />  {/*any children route will render over here*/}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Body