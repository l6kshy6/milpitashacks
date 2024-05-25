import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";

import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "./firebase";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Drives from "./pages/Drives";
import Error from "./pages/Error";
import Nav from "./components/Nav";

const testSend = () => {
  const newDoc = setDoc(doc(db, "drives", "walt's drive"), {
    name: "walt's blue sky adventure",
    start: "12-12-2026",
    end: "12-25-2026",
    goals: {
      money: 200000,
      foods: 100
    },
    dropOffLocation: "408 negra arroyo lane alberquerque new mexico",
    desc: "help walt make more epic crystal",
    creatorID: 30430850125809134850139,
    progressfunds: {
      money: 0,
      foods: 1
    }
  })
    .then(res => console.log(res));
}

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/drives" element={<Drives />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
