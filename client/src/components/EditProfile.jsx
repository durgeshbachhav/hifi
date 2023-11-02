import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../redux/slices/appConfigSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const myProfile = useSelector((state) => state?.appConfig?.myProfile);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [gender, setGender] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdating, setUpdating] = useState(false);
  useEffect(() => {
    setUsername(myProfile?.username || "");
    setBio(myProfile?.bio || "");
    setWebsite(myProfile?.website || "");
    setGender(myProfile?.gender || "");
    setAvatar(myProfile?.avatar?.url);
  }, [myProfile]);

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
    setFileToBase64(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);
    const result = await dispatch(
      updateMyProfile({
        username,
        bio,
        website,
        gender,
        avatar: imageBase64,
      })
    );

    // navigate(`/profile/${myProfile?._id}`)
    if (result.meta.requestStatus === "fulfilled") {
      // If the update was successful, navigate to the user's profile
      setUpdating(false);
      navigate(`/profile/${myProfile?._id}`);
    }
  };

  return (
    <div
      style={{ width: "70%" }}
      className="flex items-center gap-10 justify-evenly mt-4 mx-auto"
    >
      <div style={{ width: "25%" }} className="mb-2 input-user-img">
        <label htmlFor="profileImage" className="block mb-2 labelImg">
          <img
            className="rounded-full"
            src={
              avatar ||
              "https://img.freepik.com/free-vector/contact-icon-3d-vector-illustration-blue-button-with-user-profile-symbol-networking-sites-apps-cartoon-style-isolated-white-background-online-communication-digital-marketing-concept_778687-1715.jpg?w=740&t=st=1698597934~exp=1698598534~hmac=c78dcd54d73e4d2276e8a3fc4a841b0c2184b6db33993ad5478812426f6c6b11"
            }
            alt=""
          />
        </label>

        <input
          type="file"
          accept="image/*"
          id="profileImage"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div style={{ width: "75%" }} className="">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
        <hr className="rounded-full px-3 mb-3" />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2 ">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              id="username"
              placeholder="john"
              className="w-full p-2 border rounded-md outline-none text-black"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2 ">
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              className="w-full p-2 border rounded-md outline-none text-black"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="mb-2 ">
            <label htmlFor="bio" className="block mb-2">
              Bio
            </label>
            <textarea
              type="text"
              id="bio"
              value={bio}
              placeholder="freelancer/developer"
              className="w-full p-2 border rounded-md outline-none text-black"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-2 ">
            <label htmlFor="website" className="block mb-2">
              Website
            </label>
            <input
              type="text"
              placeholder="www.yourwebsite.com"
              id="website"
              value={website}
              className="w-full p-2 border rounded-md outline-none text-black"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {isUpdating ? "Updating" : "Save Changes"}
          </button>
        </form>
        <button className="bg-red-500 mt-2 text-white py-2 px-4 rounded hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
