import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();


  const signupHandler = (e) => {
    e.preventDefault();
    if (email && password && firstName && lastName) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(db, "users", user.uid), {
            email: email,
            firstName: firstName,
            lastName: lastName
          })
            .then(res => {
              console.log(res)
              if (res == undefined)
                navigate("/drives");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "\n" + errorMessage);
        })
    }
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
  };

  return (
    <div className="w-full h-full flex justify-center p-10">
      <form onSubmit={signupHandler} className="w-1/2 h-max border border-black p-10 rounded-2xl flex flex-col items-center gap-5">
        <div className="text-2xl">Sign up</div>
        <input className="border w-full rounded-2xl p-3" onChange={e => setEmail(e.target.value)} placeholder="email"></input>
        <input type="password" className="border w-full rounded-2xl p-3" onChange={e => setPassword(e.target.value)} placeholder="password"></input>
        <input className="border w-full rounded-2xl p-3" onChange={e => setFirstName(e.target.value)} placeholder="first name"></input>
        <input className="border w-full rounded-2xl p-3" onChange={e => setLastName(e.target.value)} placeholder="last name"></input>
        <button className="bg-black rounded-2xl text-white w-full p-3 hover:bg-red-500 hover:text-black transition-all">Submit</button>
      </form>
    </div>
  );
}

export default Login;