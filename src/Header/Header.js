import React, { useContext } from "react";
import './Header.css'
import LoginRoute from "../Froms/LoginRoute"
import CartButton from "./CartButton";
import { NavLink } from "react-router-dom";
import Example from "../Profile/profile";
import { useAuth, useUser } from "./Store/AuthProvider";
import CartContext from "./Store/Cart-context";
// import axios from "axios";



const Header = (props) => {
  const { isLoggedIn } = useAuth();
  const cartCtx = useContext(CartContext);
  const { user } = useUser();


  const itemsAdd = async () => {
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await axios.post('http://localhost:5000/cartItems', {
    //     cartItems: cartCtx.items, Id: user._id
    //   }, {
    //     headers: {
    //       Authorization: token,
    //     }
    //   });
    //   console.log(response)
    // } catch (err) {
    //   console.error("Error while Adding the items to Db");
    //   throw err;
    // }
    props.onShowCart()
    if(isLoggedIn){
      try{
        localStorage.setItem(`cart_${user._id}`,JSON.stringify(cartCtx.items));
        console.log("User is logged in");
      }
      catch(err){
        console.error('Error while storing the  items', err)
      }
    }
  }


  return (
    <div className="Container">
      <div className="header1">
        <h2>mobiShopee.com</h2>
      </div>
      <div className="header2">
        <div className="home">
          <NavLink to='/' style={({ isActive }) => ({
            color: isActive ? 'skyblue' : 'white',
            textDecoration: 'none'
          })}>Home</NavLink>
        </div>
        <div className="home">
          {isLoggedIn ? <Example /> : <LoginRoute />}
        </div>
      </div>
      <CartButton onClick={itemsAdd} />
    </div>
  )
};
export default Header;