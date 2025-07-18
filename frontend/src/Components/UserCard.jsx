import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { BASE_URL } from './constant';
import { removeUserFromFeed } from '../Utils/feedSlice';

const UserCard = ({ user }) => {
  
     const { _id, firstName, lastName, age, gender, description, imageUrl } = user;
    const dispatch = useDispatch();

    const handleRequest = async (status, userId) => {
        try {
            const response = await axios.post(BASE_URL+"/request/send/" + status + "/" + userId,
                {},
                {
                    withCredentials: true,
                })
                // console.log(response.data);
                
                dispatch(removeUserFromFeed(userId))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="card bg-base-300 w-84 shadow-sm h-[80vh] mt-10">
                <figure>
                    <img
                        src={imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt="Shoes"
                        className='object-contain' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " +lastName}  </h2>
                    {age && gender && <p>{gender + " " + age}</p>}

                    <p className='line-clamp-2'>{description}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary" onClick={()=>handleRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={()=>handleRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard