import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManger";
import { Navigate, Outlet } from "react-router-dom";

const RequireUser = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  return <div>{user ? <Outlet /> : <Navigate to={`/login`} />}</div>;
};

export default RequireUser;
