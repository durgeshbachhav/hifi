import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiHome,
  BiSolidAddToQueue,
  BiMessageSquareDetail,
} from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { BiLogoMessenger } from "react-icons/bi";
import { MdOutlineExplore, MdOutlineLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManger";

const SideBar = () => {
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-4 bg-primary-color h-screen sticky top-0">
      <div className="flex items-center justify-center space-x-4">
        <div>
          <div>
          <div className="text-4xl font-bold text-black flex items-center justify-center gap-1  bg-white px-2 py-2 rounded-lg ">
            <BiLogoMessenger color="orange" />
            <h2 className="text-black">H!F!</h2>
          </div>
          </div>
        </div>
      </div>
      <ul className="mt-8  py-4 bg-white  rounded-md px-2 flex flex-col gap-4">
        <li>
          <Link
            to={"/"}
            className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out active:bg-black active:text-black"
          >
            <BiHome size={25} />
            Home
          </Link>
        </li>
        <li>
          <Link className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out">
            <FiSearch size={25} />
            Search
          </Link>
        </li>
      </ul>
      <ul className="mt-2  py-4 bg-white   rounded-md px-2 flex flex-col gap-4">
        <li>
          <Link
            to={"/chat"}
            className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out "
          >
            <BiMessageSquareDetail size={25} />
            Messages
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/${myprofile?._id}`}
            className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out"
          >
            <FaUserAlt size={25} />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/create"}
            className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out"
          >
            <BiSolidAddToQueue size={25} />
            create
          </Link>
        </li>

        <li>
          <Link className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black  rounded-md hover:bg-black hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out">
            <MdOutlineExplore size={25} />
            Explore
          </Link>
        </li>
        <li onClick={handleLogout}>
          <Link className="flex items-center px-4 py-1 gap-2 text-lg font-medium text-black bg-green-200 rounded-md hover:bg-green-500 hover:text-white focus:bg-black focus:text-white transition duration-300 ease-in-out ">
            <MdOutlineLogout size={25} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
