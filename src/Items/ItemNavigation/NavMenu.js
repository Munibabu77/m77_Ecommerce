import React from "react";
import { Route, Routes } from "react-router-dom";
import Realme from './realme';
import Moto from "./moto";
import Iphone from "./iphone";
import Vivo from "./vivo";
import Home from "../../Header/Home/Home";
import Signup from "../../Froms/Signup";
import LoginPage from "../../Froms/Login";
// import { AuthProvider } from "../../Header/Store/AuthProvider";

const NavMenu = () => {
    
    return(

        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/realme" element={<Realme/>}/>
            <Route path="/moto" element={<Moto/>}/>
            <Route path="/iphone" element={<Iphone/>}/>
            <Route path="/vivo" element={<Vivo/>}/>
        </Routes>
    );
}
export default NavMenu;