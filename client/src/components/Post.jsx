import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillSave2Fill } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeAndDisliked } from "../redux/slices/postSlice";


const Post = ({ user, post }) => {
  const dispatch = useDispatch();
  
  const [liked, setLiked] = useState(post?.isLiked);
  const [likesCount, setLikesCount] = useState(post?.likesCount);
  
  const handlePostLike = async () => {
    
    dispatch(
      likeAndDisliked({
        postId: post._id,
      })
    );
    
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  useEffect(() => {
    // Update 'liked' and 'likesCount' when the 'post' prop changes
    setLiked(post?.isLiked);
    setLikesCount(post?.likesCount);
  }, [post]);

  return (
    <div className="px-4 py-2 rounded-md mt-3 bg-white">
      <div className="p-2 flex items-center justify-between">
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
          <img
            className="bg-white w-10 h-10 rounded-full"
            src={user?.avatar?.url}
            alt="username"
          />
          <div>
            <p className="font-bold">{user?.username}</p>
          </div>
        </Link>
        <li>{post?.timeAgo}</li>
      </div>
      <hr />
      <div className="">
        <div className="flex items-center justify-center w-full">
          <img className="max-h-80" src={post?.image?.url} alt="" />
        </div>
        <hr className="text-gray-600" />
        <div className="flex justify-between items-center mt-2 px-2">
          <div className="flex gap-3 items-center">
            <div onClick={handlePostLike} className="cursor-pointer">
              {liked ? (
                <AiFillHeart color="red" size={25} />
              ) : (
                <AiOutlineHeart size={25} />
              )}
            </div>
            <div>
              <Link>
                <FaCommentAlt size={20} />
              </Link>
            </div>
            <div>
              <Link>
                <IoIosShareAlt size={20} />
              </Link>
            </div>
          </div>
          <div>
            <Link>
              <BsFillSave2Fill size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-1">
        <div>{`${likesCount} likes`}</div>
        <div className="flex gap-1 items-center justify-start">
          <h3 className="text-text-primary-color text-md font-bold">{user?.username}</h3>
          <p className="text-text-secondary-color text-sm">{post?.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
