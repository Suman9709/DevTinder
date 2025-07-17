import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from "./constant"
import { addUser } from "../Utils/userSlice"
import UserCard from "./UserCard"


const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [description, setDescription] = useState(user?.description || "");

    const [error, setError] = useState('')
    const [showToast, setShowTost] = useState(false);

    const dispatch = useDispatch()

    const saveProfile = async () => {
        setError("")
        if (!firstName || firstName.length < 2) {
            setError("First name must be at least 2 characters long.");
            return;
        }

        if (!["Male", "Female", "Others"].includes(gender)) {
            setError("Please select a valid gender.");
            return;
        }

        if (age && (!/^\d+$/.test(age) || parseInt(age) < 18)) {
            setError("Age must be a number and at least 18.");
            return;
        }
        try {

            const response = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                imageUrl,
                age: age.toString(),
                gender,
                description,
            }, {
                withCredentials: true,
            });
            console.log("Edit Response", response.data);

            dispatch(addUser(response?.data?.data));

            setShowTost(true);
            setTimeout(() => {
                setShowTost(false);
            }, 3000);
        } catch (error) {

            console.error("Profile update failed:", error?.response?.data || error.message);
            setError(error?.response?.data || "Something went wrong");

        }
    }


    return (
        <>
            <div className='flex justify-center my-12'>
                <div className='flex justify-center mx-10'>


                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>


                            <div className='my-2'>
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
                                        placeholder="Enter the password" />

                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <select
                                        className="input"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age:</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Enter the password" />

                                </fieldset>
                                {/* <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age:</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Enter the password" />

                                </fieldset> */}

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">ImageUrl:</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Enter the password" />

                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Description:</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter the password" />

                                </fieldset>
                            </div>


                            <p className='text-red-200'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                <UserCard user={{ firstName, lastName, imageUrl, age, gender, description }} />
            </div>

            {
                showToast && (
                    <div className="toast toast-top toast-end z-50">
                        <div className="alert alert-info">
                            <span>Profile updated successfully</span>
                        </div>
                        
                    </div>
                )
            }
        </>


    )
}

export default EditProfile