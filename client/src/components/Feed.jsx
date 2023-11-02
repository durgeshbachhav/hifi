
import React, { useEffect } from "react";
import Post from "./Post";
import Follower from "./Follower";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../redux/slices/postSlice";
import { getFeedData } from "../redux/slices/feedSlice";
import FollowFeed from "./FollowFeed";
import SearchBar from "./SearchBar";

const Feed = () => {
  const params = useParams();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state?.feedData?.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="flex  gap-2 overflow-hidden px-2 relative">
      <div style={{width:"66%"}} className="">
        <div>
          <SearchBar />
        </div>
        {feedData?.followings?.map((user) =>
          user.posts.map((post) => (
            <Post post={post} user={user} key={post._id} />
          ))
        )}
      </div>
      <div className="fixed top-0 right-2" style={{ width: "25%" }}>
        <FollowFeed />
      </div>
    </div>
  );
};

export default Feed;
