import React, { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../redux/slices/postSlice";
import { TOAST_SUCCESS } from "../App";
import Trending from "./Trending";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const navigate = useNavigate();

  const hanldePostSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosClient.post(
      "/post",
      {
        caption,
        image: imageBase64,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(
      getUserProfile({
        userId: myProfile?._id,
      })
    );

    if (response.status === "ok") {
      navigate("/profile/:userId");
    }
  };

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
  };

  return (
    <div
      style={{ width: "100%" }}
      className="flex items-start justify-start px-4 gap-4"
    >
      <div
        style={{ width: "66%" }}
        className="w-full p-4 m-4  mt-3 mr-3 bg-gray-800 rounded-lg shadow"
      >
        <input
          value={caption}
          type="text"
          className="w-full py-2 px-3 border rounded-md outline-none text-black"
          placeholder="What's on your mind?"
          onChange={(e) => setCaption(e.target.value)}
        />
        {imageBase64 && (
          <div className="mt-2">
            <img
              className="max-w-full max-h-96 rounded-lg"
              src={imageBase64}
              alt="post-img"
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="inputImg" className="cursor-pointer text-blue-500">
              <BsCardImage color="white" size={20} />
            </label>
            <input
              className="hidden"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={hanldePostSubmit}
          >
            Post
          </button>
        </div>
      </div>
      <div style={{ width: "34%" }}>
        <Trending />
      </div>
    </div>
  );
}

export default CreatePost;
