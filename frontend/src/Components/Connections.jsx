import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Utils/connectionSlice";
import { Link } from "react-router-dom"; 

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center my-24 text-xl font-bold text-gray-500">
        Fetching Connections...
      </h1>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <h1 className="text-center my-24 text-xl font-bold">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary my-16">
          Your Connections
        </h2>

        <div className="space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName } = connection;
            console.log("connections", connection);

            return (
              <div
                key={_id}
                className="flex items-center p-4 bg-base-300 shadow-md hover:shadow-lg transition duration-300 rounded-xl w-1/2 mx-auto"
              >
              
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  {firstName?.[0] || ""}
                  {lastName?.[0] || ""}
                </div>

                <div className="ml-6 w-full">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h3 className="text-xl font-semibold text-white">
                      {firstName} {lastName}
                    </h3>
                    <Link to={"/chat/" + _id}>
                      <button className="btn btn-primary">Chat</button>
                    </Link>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
