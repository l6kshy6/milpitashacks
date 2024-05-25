import React from "react";
import {Link} from "react-router-dom";

const Nav = ()=>{
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/drives">Drives</Link>
        </div>
    );
}

export default Nav;