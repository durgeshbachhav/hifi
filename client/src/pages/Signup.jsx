import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import { BiLogoMessenger } from 'react-icons/bi'
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
   try {
    const response =await axiosClient.post('/auth/signup',{
      username,
      email,
      password
    })
    if(response.status==='ok'){
      navigate('/login')
    }
  
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="flex w-full items-center justify-center gap-10   mt-20">
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
        <div className=" rounded-md flex flex-col items-center justify-center px-2 py-8 bg-gray-900">
          <h2 className="font-bold text-2xl text-blue-500">Signup</h2>
          <div className="w-full px-10 flex flex-col gap-2">
            <div className="flex flex-col gap-3 w-full">
              <label
                className="px-4 text-lg font-semibold text-white "
                htmlFor="username"
              >
                Username
              </label>
              <input
                placeholder="enter username here"
                className="px-4 py-2 w-full outline-none border-2 rounded-sm"
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label
                className="px-4 text-lg font-semibold text-white "
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
                className="px-4  text-white  text-lg font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="enter password here"
                className=" px-4 py-2 w-full outline-none border-2 rounded-sm"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to={"/login"} className="text-white">
              Already Have An Account?{" "}
              <span className="text-blue-500">Login</span>
            </Link>

            <button
              className="w-full  bg-blue-500 mt-4 rounded-sm text-white font-bold
          py-2
          "
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
