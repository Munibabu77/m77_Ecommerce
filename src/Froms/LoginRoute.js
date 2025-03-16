import React from "react";
import { NavLink } from "react-router-dom";

const LoginRoute = () => {


    return (
        <>
            <NavLink to='/Login' style={({ isActive }) => ({
                color: isActive ? 'skyblue' : 'white',
                textDecoration: 'none'
            })}
            >Login</NavLink>
        </>
    );
};
export default LoginRoute;