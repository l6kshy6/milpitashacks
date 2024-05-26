import { useState, useEffect } from "react";
import Home from "./pages/Home";

import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "./firebase";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Drives from "./pages/Drives";
import CreateDrive from "./pages/CreateDrive";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Nav from "./components/Nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      }
      else {
        setUser("poopy");
        // navigate("/login");
      } console.log(user);
    });
  }, []);



  return (
    <div className="h-screen flex flex-col">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/drives" element={<Drives />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/create" element={<CreateDrive user={user} />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
