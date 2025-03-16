import React from "react";
import { NavLink } from "react-router-dom";

const SignupRoute = () => {
    return (
        <NavLink to='/Signup' style={({ isActive }) => ({
            color: isActive ? 'skyBlue' : 'white',
            textDecoration: 'none',marginTop:'0.5rem'
        })}
        >Signup</NavLink>
    );
}
export default SignupRoute;