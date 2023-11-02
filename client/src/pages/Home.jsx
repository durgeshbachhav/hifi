import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../redux/slices/appConfigSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  return (
    <div className="flex">
      <div style={{ width: "20%", position: "fixed", height: "100vh" }}>
        <SideBar />
      </div>
      <div
        style={{ width: "80%", marginLeft: "20%" }} // Adjust margin to accommodate the fixed sidebar
        className="content ml-5 text-text-primary-color"
      >
        {/* Add your Home component content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
