import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"; 
import { useState } from "react";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "../firebase";
import {useNavigate} from "react-router-dom";

const auth = getAuth();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    navigate("/drives");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    <div className="w-full h-full flex justify-center p-10">
      <form onSubmit={loginHandler} className="w-1/2 h-max border border-black p-10 rounded-2xl flex flex-col items-center gap-5">
        <div className="text-2xl">Log in</div>
        <input className="border w-full rounded-2xl p-3" onChange={e=>setEmail(e.target.value)}placeholder="email"></input>
        <input type="password" className="border w-full rounded-2xl p-3" onChange={e=>setPassword(e.target.value)}placeholder="password"></input>
        <button className="bg-black rounded-2xl text-white w-full p-3 hover:bg-red-500 hover:text-black transition-all">Submit</button>
      </form>
    </div>
  );
}

export default Login;