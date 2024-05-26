import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";

const Nav = ({user}) => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        signOut(auth)
            .then(()=>{
                console.log("logged out");
                navigate("/");
            })
    }
    console.log(user);
    return (
        <div className="flex justify-between p-5 items-center">
            <Link to="/" className="text-2xl"><span className="text-red-600">We</span>Drive</Link>
            <div className="flex gap-5 items-center">
                {user!="poopy" && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
                <Link to={user ? "/create" : "/signup" } className="hover:underline">Create</Link>
                <Link to="/drives" className="hover:underline">Drives</Link>
                {user=="poopy" ? <><Link to="/login" className="hover:underline">Log in</Link>
                <Link to="/signup" className="bg-black text-white p-3 rounded-2xl hover:bg-red-500 hover:text-black transition-all">Sign up</Link></>
                : <button onClick={logoutHandler} className="bg-black text-white p-3 rounded-2xl hover:bg-red-500 hover:text-black transition-all">Log out</button>}
            </div>
        </div>
    );
}

export default Nav;