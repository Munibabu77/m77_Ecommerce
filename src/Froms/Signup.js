import React, { Fragment,useState } from "react";
import Styles from './Signup.module.css';
import { Modal } from "react-bootstrap";
import {Alert} from "react-bootstrap";
// import MyAlert from "../Alerts/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect } from "react";


const Signup = () => {
    const replace = useNavigate()
    const [modalMessage, setModalMessage] = useState(false);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
            
    //     }, 3000)
    //     return () => clearTimeout(timeout);
    // }, [])

    const [data, setData] = useState({
        name: '',
        Email: '',
        Password: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        Email: '',
        Password: '',
    })

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        })

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
        } else if (name === 'Email') {
            if (value.length === 0) {
                setErrors({
                    ...errors,
                    Email: 'Enter the email address'
                })
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                setErrors({
                    ...errors,
                    Email: 'Enter valid Email address'
                })
            } else {
                setErrors({
                    ...errors,
                    Email: '',
                })
            }
        } else if (name === 'Password') {
            if (value.length !== 12 || !/[a-zA-Z0-9!@#$%^&*]/.test(value)) {
                setErrors({
                    ...errors,
                    Password: 'Password must be 12 characters with a combination of symbols, numbers, and text',
                });
            } else if (value.length === 0 && value.length === 12) {
                setErrors({
                    ...errors,
                    Password: 'Enter the Password'
                })
            }
            else {
                setErrors({
                    ...errors,
                    Password: '',
                });
            }
        }

    };
    const name = data.name;
    const email = data.Email;
    const password = data.Password;



    const SubmitHandler = (event) => {
        event.preventDefault();

        if (data.name.length === 0
            && data.Password.length === 0
            && data.Email.length === 0) {
            setErrors({
                ...errors,
                name: 'Please enter the name',
                Password: 'Enter the password',
                Email: 'Enter the email'
            })
        } else if (data.name.length !== 0
            && data.Password.length !== 0
            && data.Email.length !== 0
            ) {

            const dataSubmit = async () => {
                try {
                    const response = await axios.post("http://localhost:5000/Users", { name, email, password},{withCredentials:true});
                    console.log(response)
                    if (response.status === 201) {
                        return (setModal(true) ,setModalMessage(true))
                    }
                } catch (err) {
                    console.log(err.response.data.error)
                    if (err.response.data.error === "User already exists") {
                        setModalMessage(false);
                        setModal(true)
                        setError("User already exists")
                    }else {
                        setError("Some error occured");
                        console.log(err)
                    }
                }
            };
            dataSubmit();
            setData({
                name: '',
                Password: '',
                Email: '',
            })

        } else if (errors) {
            alert("Enter the correct details has required pattern");
            setModal(false);
        }
    }



    const handleClose = (event) => {
        event.preventDefault();
        setModal(false);
        replace('/Login')
    }
    return (
        <Fragment>
            <div className={Styles.signup}>
                {
                    error &&
                    <Alert variant="danger" className="d-flex justify-content-center">
                       {error}
                    </Alert>
                }
                <h3>Signup Page</h3>
                <form onSubmit={SubmitHandler}>
                    <span className={Styles.Input}>
                        <label htmlFor="name">User Name:</label>
                        <input
                            type="text"
                            name="name"
                            style={{ border: errors.name ? '2px solid red' : '' }}
                            value={data.name}
                            onChange={changeHandler}
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </span>

                    <div className={Styles.Input}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="Password"
                            style={{ border: errors.Password ? '2px solid red' : '' }}
                            value={data.Password}
                            onChange={changeHandler}
                        />
                        {errors.Password && <p className="error" style={{ color: 'red', }}>{errors.Password}</p>}
                    </div>

                    <span className={Styles.Input}>
                        <label htmlFor="Email">Email :</label>
                        <input
                            type="email"
                            name="Email"
                            style={{ border: errors.Email ? '2px solid red' : '' }}
                            value={data.Email}
                            onChange={changeHandler}
                        />
                        {errors.Email && <p style={{ color: 'red' }}>{errors.Email}</p>}
                    </span>
                    <span className={Styles.B4}>
                        <button type="submit" >Create</button>
                        <span> Existing user?  <NavLink to='/Login'> Please login</NavLink></span>
                    </span>
                </form>
            </div>

            <Modal show={modal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>SignUp Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!modalMessage ? (
                        <div>
                            <p>
                                {" "}
                                <strong>Account already exists.</strong>{" "}
                            </p>
                            <p>Please login with respective credentials.</p>
                        </div>
                    ) : (
                        <div>
                            <p>
                                <strong>Welcome </strong>
                            </p>
                            <p>Your account has been created succesfully.</p>
                            <p>
                                You will be redirected to login. Please enter your credentials
                                there for login.
                            </p>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-danger" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>


        </Fragment>
    );
}
export default Signup;