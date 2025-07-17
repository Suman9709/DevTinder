import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from './constant';
import axios from 'axios'
import { removeUser } from '../Utils/userSlice';
const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store => store.user);
    console.log(user);

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, {
                withCredentials: true
            });
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="navbar bg-base-300 fixed top-0 z-20">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">🧑‍💻Tinder</Link>
            </div>
            {user && (<div className="flex gap-2">
                <div className='form-control mt-2 text-xl'>Welcome, {user.firstName}</div>
                <div className="dropdown dropdown-end mx-5 ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full border-2 border-white">
                            <span className="text-lg font-semibold flex w-full h-full items-center justify-center  leading-none">
                                {user.firstName[0].toUpperCase()}
                            </span>
                        </div>
                    </div>


                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={"/profile"} className="justify-between">
                                Profile

                            </Link>
                        </li>
                        <li><Link to={"/connections"}>Connections</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>)}
        </div>
    )
}

export default Navbar