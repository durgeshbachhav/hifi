import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";

const UserSide = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  // Fetch user data for the chat
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    try {
      const getUserData = async () => {
        const response = await axiosClient.post(`/user/get-user-profile`, {
          userId,
        });
        setUserData(response.result);
      };
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="p-2 rounded-lg hover:bg-white  cursor-pointer overflow-hidden bg-gray-300">
        <div className="flex items-center">
          <div>
            <img className="w-10 h-10 rounded-full" src={userData?.avatar?.url} alt="" />
          </div>
          <div className="ml-2">
            <h2 className="text-lg font-bold">{userData?.username}</h2>
            {online ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-gray-400">Offline</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSide;
