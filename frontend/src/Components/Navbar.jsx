import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Navbar = () => {

    const user = useSelector(store => store.user);
    console.log(user);

    return (

        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">🧑‍💻Tinder</Link>
            </div>
            {user && (<div className="flex gap-2">
                <div className='form-control mt-2 text-xl'>Welcome, {user.firstName}</div>
                <div className="dropdown dropdown-end mx-5 ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full border-2 border-white">
                            <span className="text-lg font-semibold flex w-full h-full items-center justify-center  leading-none">
                                {user.firstName[0]}
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
                        <li><a>Settings</a></li>
                        <li><Link to={"/login"}>Logout</Link></li>
                    </ul>
                </div>
            </div>)}
        </div>
    )
}

export default Navbar