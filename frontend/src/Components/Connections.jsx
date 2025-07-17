import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from './constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../Utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return
  if (connections.length === 0) {
    return <h1 className="text-center my-24 text-xl font-bold">No Connections Found</h1>;
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary my-20">Your Connections</h2>

        {connections.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No Connections Found</p>
        ) : (
          <div className="space-y-6">
            {connections.map((connection) => {
              const { _id, firstName, lastName, age, gender, description, imageUrl } = connection;

              return (
                <div
                  key={_id}
                  className="flex items-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 text-black"
                >
                  <img
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    src={imageUrl}
                  />
                  <div className="ml-6 flex justify-center">
                    <h3 className="text-2xl font-semibold text-gray-800">{firstName + " " + lastName}</h3>
                    {age && gender && (
                      <p className="text-sm text-gray-500">{gender}, Age {age}</p>
                    )}
                   
                      {description && (<p className="mt-1 text-sm text-gray-600">{description}</p>)}
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

};

export default Connections;
