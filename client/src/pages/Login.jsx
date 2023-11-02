import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../utils/localStorageManger";
import store from "../redux/store";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../App";
import { BiLogoMessenger } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/slices/appConfigSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      
      navigate("/");
      dispatch(showToast({
        type:TOAST_SUCCESS,
        message:"Login Successfully"
      }))
    } catch (error) {
      dispatch(showToast({
        type:TOAST_FAILURE,
        message:"The user does not exist. You can sign up to create a new account"
      }))
      console.log(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center mt-20 gap-5">
      <div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-bold text-white flex items-center justify-center gap-1  bg-slate-950 px-6 py-4 rounded-lg ">
            <BiLogoMessenger color="orange" />
            <h2 className="text-white">H!F!</h2>
          </div>
          <p className="text-white text-2xl px-6 py-1 rounded-md bg-slate-900">
            Share Your <span className="font-bold text-pink-500">Story</span>.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className=" shadow rounded-md w-2/6">
        <div className=" rounded-md flex flex-col items-center justify-center px-2 py-8 bg-gray-900 ">
          <h2 className="font-bold text-2xl text-blue-500">Login</h2>
          <div className="w-full px-10 flex flex-col gap-2">
            <div className="flex flex-col gap-3 w-full">
              <label
                className="px-4 text-white text-lg font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                placeholder="enter email here"
                className="px-4 py-2 w-full outline-none border-2 rounded-sm"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label
                className="px-4 text-white text-lg font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="enter password here"
                className="px-4 py-2 w-full outline-none border-2 rounded-sm"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to={"/signup"} className="text-white ">
              Don't Have An Account?{" "}
              <span className="text-blue-500">Signup</span>
            </Link>
            <button
              className="w-full  bg-blue-500 mt-4 rounded-sm text-white font-bold
          py-2
          "
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
