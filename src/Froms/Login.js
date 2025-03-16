import React, { useState, useContext ,useEffect} from "react";
import Styles from './Login.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../Header/Store/AuthProvider";
import axios from "axios";
import { Alert } from "react-bootstrap"
import CartContext from "../Header/Store/Cart-context";
// import { useCookies } from "react-cookie";

function LoginPage() {
    const [error, setError] = useState("");
    const { login } = useUser();
    const { user } = useUser();
    const {isLoggedIn} = useAuth();
    const cartCtx = useContext(CartContext);
    const { handleLogin } = useAuth();
    // const [cookies] = useCookies([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem(`cart_${user._id}`)
        if(isLoggedIn){
            if (storedData) {
                cartCtx.setItems(JSON.parse(storedData));
                console.log(storedData)
            }
        }else{
            cartCtx.clearCart();
        }
    },[])

    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        password: '',
    });
    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/");
    //     }
    // }, [cookies, navigate])

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'name') {
            if (value.length === 0) {
                setErrors({
                    ...errors,
                    name: 'Name cannot be empty',
                });
            } else if (value.length > 30) {
                setErrors({
                    ...errors,
                    name: 'Name cannot exceed 30 characters',
                });
            } else if (!/^[a-zA-Z]+$/.test(value)) {
                setErrors({
                    ...errors,
                    name: 'Enter alphabets only',
                });
            } else {
                setErrors({
                    ...errors,
                    name: '',
                });
            }
        } else if (name === 'password') {
            if (value.length !== 12 || !/[a-zA-Z0-9!@#$%^&*]/.test(value)) {
                setErrors({
                    ...errors,
                    password: 'Password must be 12 characters with a combination of symbols, numbers, and text',
                });
            } else {
                setErrors({
                    ...errors,
                    password: '',
                });
            }
        }

    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.name || errors.password) {
            alert('Please fix the validation errors before submitting.');
            return;
        }

        if (formData.name.trim() === "" && formData.password.length === 0) {

            setErrors({
                ...errors,
                name: 'Enter the name please',
                password: 'Enter the password'
            })
        } else if (formData.name.trim() === "") {
            setErrors({
                ...errors,
                name: 'Enter the name please',
            })
        } else if (formData.password.length === 0) {
            setErrors({
                ...errors,
                password: 'Enter the password'
            })
        }
        else if (formData.name.length !== 0 &&
            formData.password.length !== 0) {
            const dataSubmit = async () => {
                try {
                    const data = await axios.post("http://localhost:5000/login",
                        { name: formData.name, password: formData.password },
                        { withCredentials: true });
                    localStorage.setItem("accessToken", data.data.token)
                    login(data.data.user)
                    if (data) {
                        const storedData = localStorage.getItem(`cart_${user._id}`)
                        if (storedData) {
                            cartCtx.setItems(JSON.parse(storedData));
                            console.log(storedData)
                        }
                        login(data.data.user);
                        navigate('/');
                        handleLogin();
                        setFormData({
                            name: '',
                            password: '',
                        });
                    }
                } catch (err) {
                    console.log(err);
                    if (err.request.status === 404) {
                        setError(`${err.response.data.error} 
                        ${err.response.data.error === "User not found" ? ", Create account" : ", Enter correct password"}`);
                        setFormData({
                            name: '',
                            password: '',
                        });
                    }
                    else {
                        setError(`${err.message} ,While connecting to the backend`)
                    }
                }
            }
            dataSubmit();
        };
    }



    return (
        <div className={Styles.login}>
            {
                error &&
                <Alert variant="danger" className="d-flex justify-content-center text-sm">
                    <span>{error}</span>
                </Alert>
            }
            <h4>Login Page</h4>
            <form onSubmit={handleSubmit} >
                <div className={Styles.Input}>
                    <label>User Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        style={{ border: errors.name ? '2px solid red' : '' }}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="error" style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div className={Styles.Input}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        style={{ border: errors.password ? '2px solid red' : '' }}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div className={Styles.new}>
                    <div className={Styles.button1}>
                        <button type="submit" className={Styles.button} >Login</button>
                    </div>
                    <p>New user?<NavLink to='/SignUp'> Create account</NavLink></p>
                </div>

            </form>
        </div>
    );
}

export default LoginPage;