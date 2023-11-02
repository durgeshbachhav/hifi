import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { followAndUnfollowUser } from "../redux/slices/feedSlice";
import { createChat } from "../redux/slices/appConfigSlice";
import { axiosClient } from "../utils/axiosClient";

const User = () => {
  const userprofile = useSelector((state) => state.userProfile.userProfile);
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const feedData = useSelector((state) => state.feedData.feedData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isMyProfile = useMemo(
    () => myprofile?._id === params.userId,
    [myprofile, params.userId]
  );

  const [isFollowing, setIsFollowing] = useState(
    feedData?.followings?.some((item) => item._id === params.userId)
  );

  const handleUserFollow = () => {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId,
      })
    );
    // Toggle isFollowing state when the button is clicked
    setIsFollowing(!isFollowing);
  };

  const handleCreateChat = async () => {
    try {
      const response = await axiosClient.get(
        `/chat/find/${myprofile?._id}/${userprofile?._id}`
      );
  
      if (response.result.chat === null) {
        dispatch(
          createChat({
            senderId: myprofile?._id,
            receiverId: userprofile?._id,
          })
        );
        navigate('/chat')
      }else{
        navigate('/chat')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ width: "100%" }}
      className="flex justify-between items-center px-8 py-6 shadow-md rounded-lg bg-black text-white"
    >
      <div className="flex gap-8">
        <div style={{ width:'25%'}} className="flex items-center justify-center">
          <img
            className="w-30 h-30 rounded-full bg-white"
            src={
              userprofile?.avatar?.url
                ? userprofile.avatar.url
                : "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1698596838~exp=1698597438~hmac=6b9e2c3901cddce58a39bcc93c8fce58b11bbb090e1bd60df6be7a1d86536d29" // Provide a placeholder image path
            }
            alt=""
          />
        </div>

        <div style={{width:"75%"}} className="px-2 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-10 ">
            <h3 className="text-2xl font-semibold">{userprofile?.username}</h3>
            {isMyProfile ? (
              <Link
                to="/edit"
                className="bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-800"
              >
                Edit Profile
              </Link>
            ) : (
              <button
                onClick={handleUserFollow}
                className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
            {isFollowing && (
              <button
                onClick={handleCreateChat}
                className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600`}
              >
                messages
              </button>
            )}
          </div>
          <div className="flex gap-3 items-center justify-evenly mt-4">
            <h2 className="font-semibold">
              {userprofile?.posts?.length} Posts
            </h2>

            <h2 className="font-semibold">
              {userprofile?.followers?.length} Followers
            </h2>
            <h2 className="font-semibold ">
              {userprofile?.followings?.length} Followings
            </h2>
          </div>
          <div className="mt-4 ">
            <div className="">{userprofile?.bio}</div>
            <div className="">
              <a href="#">{userprofile?.website}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
