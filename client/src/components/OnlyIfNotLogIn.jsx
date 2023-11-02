import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManger";
import { Navigate, Outlet } from "react-router-dom";

const OnlyIfNotLogIn = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default OnlyIfNotLogIn;
