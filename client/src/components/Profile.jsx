import React, { useEffect, useState } from "react";
import User from "./User";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../redux/slices/postSlice";
import Follower from "./Follower";
import FollowFeed from "./FollowFeed";
import Trending from "./Trending";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userprofile = useSelector((state) => state.userProfile.userProfile);
  const feedData = useSelector((state) => state.feedData.feedData);
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
  }, [params.userId]);
  return (
    <div style={{ width: "100%" }} className="flex gap-2 px-2 overflow-hidden relative">
      <div style={{ width: "66%" }} className="flex flex-col gap-2">
        <div className="flex items-center justify-center my-4">
          <User />
        </div>
        {userprofile?.posts?.map((post) => {
          return <Post user={userprofile} post={post} key={post._id} />;
        })}
      </div>
      <div className="fixed top-0 right-2" style={{ width: "25%" }}>
        <FollowFeed />
      </div>

    </div>
  );
};

export default Profile;
