import React,{ useState, useContext } from "react";
import AuthContext from './AuthContext';
import { useEffect } from "react";
import CartContext from "./Cart-context";
// import userEvent from "@testing-library/user-event";



export function AuthProvider({children}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))|| null);
    const cartCtx = useContext(CartContext);

    const [isLoggedIn, setIsLoggedIn]= useState(
        JSON.parse(localStorage.getItem('isLoggedIn'))|| false
    );
    
    useEffect(() => {
       localStorage.setItem('user',JSON.stringify(user))
    },[user])

    useEffect(()=>{
        localStorage.setItem('isLoggedIn',JSON.stringify(isLoggedIn));
    },[isLoggedIn]);

    const login = (userDetails) => {
        setUser(userDetails);
        setIsLoggedIn(true);
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartCtx.items));
    }, [cartCtx.items]);

    
   
    const handleLogin = () => {
        setIsLoggedIn(true);
    }
    return(
        <AuthContext.Provider value = {{isLoggedIn, handleLogin, setIsLoggedIn, login, user}}>
            {children}
        </AuthContext.Provider>
    )
};
export const useUser = () => {
    return useContext(AuthContext);
}

// const useAuth = () => {
//     return useContext(AuthContext);
// }
// export default useAuth;

export function useAuth(){
    return useContext(AuthContext);
}