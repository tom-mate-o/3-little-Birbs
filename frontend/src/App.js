import "./App.css";

import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

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

// costum hooks
import useMongoDBUserData from "./costumHooks/useMongoDBUserData";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isBellRed, setIsBellRed] = useState(false);

  const token = localStorage.getItem("token");
  let UserID;
  
  if (token) {
    const decodedToken = jwtDecode(token);
    UserID = decodedToken?.id;
  }

  const {userData} = useMongoDBUserData();

  useEffect(() => {
    if (userData) {
      // Finde die Daten des eingeloggten Benutzers
      const currentUserData = userData.find(user => user.id === UserID);
  
      if (currentUserData) {
        const newNotifications = [];

        if (currentUserData){
          const hasUnreadNotifications = currentUserData.recievedPostsIds.some(post => !post.read) || currentUserData.friendIds.some(friend => !friend.read);
          setIsBellRed(hasUnreadNotifications);
        } else {
          setIsBellRed(false);
        }
      
        // Überprüfen die recievedPostsIds, wenn sie existieren
        if (currentUserData.recievedPostsIds) {
          currentUserData.recievedPostsIds.forEach(post => {
            if (!post.read) {
              newNotifications.push({ id: post.id, message: "sent you a Message", type: 'post' });
            }
          });
        }
      
        // Überprüfen die friendIds, wenn sie existieren
        if (currentUserData.friendIds) {
          currentUserData.friendIds.forEach(friend => {
            if (!friend.read) {
              newNotifications.push({ friendcode: friend.friendcode, date: friend.date, message: 'is now your friend!', type: 'friend' });
            }
          });
        }
      
        // Setze die neuen Benachrichtigungen
        setNotifications(newNotifications);
      }
    }
  }, [userData, loggedIn, UserID]); // Fügen UserID zu den Abhängigkeiten hinzu, damit der useEffect-Hook ausgeführt wird, wenn sich UserID ändert

  const handleLogout = () => {
    setLoggedIn(false);
    setIsBellRed(false);
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
            <Route path="/notifications" element={loggedIn ? <Notifications notifications={notifications} setNotifications={setNotifications} /> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/settings" element={loggedIn ? <Settings handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/post/:postId" element={loggedIn ? <Post handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} loggedIn={loggedIn} replace/>}/>
            <Route path="/login" element={<Login loggedIn={loggedIn} handleLogin={handleLogin}/>}  />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ToastContainer />
        </div>

{/* -------NAVBAR------- */}
      <Navbar key={UserID} isBellRed={isBellRed}/>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
