import "./App.css";

import React, { useEffect, useState } from "react";
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
import Post from "./pages/post";

import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import showNotifications from "./components/showNotifications/showNotifications";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    showNotifications("Bye, for now! 👋", "");
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  },[]);

  return (
    <div className="App">


{/* -------BROWSER ROUTER------- */}

      <BrowserRouter>
        <div className="contentContainer">
          <Routes>
          <Route path="/" element={loggedIn ? <Feed /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/feed" element={loggedIn ? <Feed /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/newpost" element={loggedIn ? <NewPost /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/postsuccessful" element={loggedIn ? <PostSuccessful /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/posttoafriend" element={loggedIn ? <PostToAFriend /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/posttoafriendsuccessful" element={loggedIn ? <PostToAFriendSuccessful /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/messages" element={loggedIn ? <Messages /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/calendararchive" element={loggedIn ? <CalendarArchive /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/addafriend" element={loggedIn ? <AddAFriend /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/notifications" element={loggedIn ? <Notifications /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/settings" element={loggedIn ? <Settings handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/post/:postId" element={loggedIn ? <Post handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/login" element={<Login loggedIn={loggedIn} handleLogin={handleLogin}/>}  />
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
