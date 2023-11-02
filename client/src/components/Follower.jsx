import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser } from "../redux/slices/feedSlice";
import { Link } from "react-router-dom";

const Follower = ({ user }) => {
  const feedData = useSelector((state) => state.feedData.feedData);
  const dispatch = useDispatch();
  const [isfollowing, setIsFollowing] = useState(false); // Initialize as false

  useEffect(() => {
    // Use the setIsFollowing function to update the state
    setIsFollowing(feedData.followings.some((item) => item._id === user._id));
  }, [feedData, user._id]);

  const handleuserfollow = () => {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: user._id,
      })
    );
  };

  return (
    <div className="flex justify-between items-center mt-3 sticky top-0 right-0">
      <div className="flex gap-4">
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
          <div>
            <img
              className="bg-white w-8 h-8 rounded-full"
              src={user?.avatar?.url}
              alt=""
            />
          </div>
          <div>
            <p className="font-bold text-white">{user?.username}</p>
          </div>
        </Link>
      </div>
      <button className="bg-blue-500 font-semibold hover:bg-blue-700  px-4 py-1 rounded-lg" onClick={handleuserfollow}>
        {isfollowing ? "unfollow" : "follow"}
      </button>
    </div>
  );
};

export default Follower;