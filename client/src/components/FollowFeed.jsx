import React from "react";
import { useSelector } from "react-redux";
import Follower from "./Follower";

const FollowFeed = () => {
  const feedData = useSelector((state) => state.feedData.feedData);
  return (
    <div className=" mt-3 bg-primary-color px-4  py-4 rounded-md">
      <h2 className="p-2 bg-white text-black font-semibold rounded-lg">suggestions for you</h2>
      {feedData?.suggestions?.map((user) => (
        <Follower user={user} />
      ))}
      <h2  className="p-2 bg-white text-black font-semibold rounded-lg mt-4">people you follow</h2>
      {feedData?.followings?.map((user) => (
        <Follower user={user} />
      ))}
    </div>
  );
};
export default FollowFeed;