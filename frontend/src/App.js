import logo from "./pecking_animation.gif";
import "./App.css";

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Feed from "./pages/feed";
import NewPost from "./pages/newPost";
import PostSuccessful from "./pages/postSuccessful";
import PostToAFriend from "./pages/postToAFriend";
import PostToAFriendSuccessful from "./pages/postToAFriendSuccessful";
import Messages from "./pages/messages";
import CalendarArchive from "./pages/calendarArchive";
import AddAFriend from "./pages/addAFriend";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
import Login from "./pages/login";
import Register from "./pages/register";

import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">


{/* -------BROWSER ROUTER------- */}

      <BrowserRouter>
        <div className="contentContainer">
          <Routes>
          <Route path="/" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/postsuccessful" element={<PostSuccessful />} />
            <Route path="/posttoafriend" element={<PostToAFriend />} />
            <Route
              path="/posttoafriendsuccessful"
              element={<PostToAFriendSuccessful />}
            />
            <Route path="/messages" element={<Messages />} />
            <Route path="/calendararchive" element={<CalendarArchive />} />
            <Route path="/addafriend" element={<AddAFriend />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ToastContainer />
        </div>

{/* -------NAVBAR------- */}
      <Navbar />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
