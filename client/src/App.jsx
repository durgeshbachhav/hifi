import { useSelector } from "react-redux";
import "./App.css";
import CreatePost from "./components/CreatePost";
import EditProfile from "./components/EditProfile";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import RequireUser from "./components/RequireUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import OnlyIfNotLogIn from "./components/OnlyIfNotLogIn";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Chat from "./pages/Chat";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";
function App() {
  const myprofile = useSelector((state) => state.appConfig.myProfile);
  const toastData = useSelector((state) => state.appConfig.toastData);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLogIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
