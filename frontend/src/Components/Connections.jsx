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
        <h2 className="text-3xl font-bold text-center text-primary my-16">Your Connections</h2>

        {connections.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No Connections Found</p>
        ) : (
          <div className="space-y-2">
            {connections.map((connection) => {
              const { _id, firstName, lastName, age, gender, description, imageUrl } = connection;

              return (
                <div
                  key={_id}
                  className="flex p-4 bg-base-300 shadow-md hover:shadow-md transition duration-300 rounded-xl w-1/2 mx-auto"
                >
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="w-20 h-16 rounded-full object-cover border-4 border-primary"
                  />

                  <div className="ml-6 w-full">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="text-xl font-semibold text-white">{firstName} {lastName}</h3>
                      {age && gender && (
                        <p className="text-sm text-white italic">{gender}, Age {age}</p>
                      )}
                      {
                        description && (
                          <p>{description}</p>
                        )
                      }
                    </div>

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
