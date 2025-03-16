import React, { Fragment, useState } from "react";
import './order.css';
import { Modal, ModalBody, ModalTitle, ModalFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../../../Header/Store/AuthProvider';
// import {Alert} from "react-bootstrap";

const OrderForm = ({ setOrder, clearCart,orderDetails}) => {
    const replace = useNavigate();
    const {user} = useUser();
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Number: '',
        Address: ''
    });

    const [errors, setErrors] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Number: '',
        Address: ''
    });

    const handleInput = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value
        });

        if (name === 'FirstName') {
            if (value.length === 0) {
                setErrors({
                    ...errors,
                    FirstName: 'First Name should not be empty'
                });
            } else if (value.length > 30) {
                setErrors({
                    ...errors,
                    FirstName: 'First Name should be less than 30 characters'
                });
            } else if (!/^[a-zA-Z]+$/.test(value)) {
                setErrors({
                    ...errors,
                    FirstName: 'Enter alphabets only'
                });
            } else {
                setErrors({
                    ...errors,
                    FirstName: ''
                });
            }
        } else if (name === 'LastName') {
            if (value.length === 0) {
                setErrors({
                    ...errors,
                    LastName: 'Last Name should not be empty'
                });
            } else if (value.length > 30) {
                setErrors({
                    ...errors,
                    LastName: 'Last Name should be less than 30 characters'
                });
            } else if (!/^[a-zA-Z]+$/.test(value)) {
                setErrors({
                    ...errors,
                    LastName: 'Enter alphabets only'
                });
            } else {
                setErrors({
                    ...errors,
                    LastName: ''
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
        } else if (name === 'Number') {
            if (value.length === 0 || value.length > 10) {
                setErrors({
                    ...errors,
                    Number: 'Enter 10 digits mobile number'
                })
            } else if (! /^[0-9]{1,10}/.test(value) || value.length !== 10) {
                setErrors({
                    ...errors,
                    Number: 'Enter 10 digits only'
                })
            }
            else {
                setErrors({
                    ...errors,
                    Number: '',
                })
            }
        } else if (name === 'Address') {
            if (value.length === 0) {
                setErrors({
                    ...errors,
                    Address: 'Enter your Address and not be empty'
                })
            } else {
                setErrors({
                    ...errors,
                    Address: ''
                })
            }
        }
    }

    const orderHandler = async (event) => {
        event.preventDefault();
        if (data.FirstName.length === 0
            && data.LastName.length === 0
            && data.Email.length === 0
            && data.Number.length === 0
            && data.Address.length === 0) {
            setErrors({
                ...errors,
                FirstName: 'Enter the Firstname Please',
                LastName: 'Enter the Lastname Please',
                Email: 'Enter the Email Please',
                Number: 'Enter the name Please',
                Address: 'Enter the name Please',
            }
            )
        } else {
            // console.log(orderDetails)
            try{
                const token  = localStorage.getItem('accessToken')
                const response = await axios.post('http://localhost:5000/order', {
                Address :data.Address,
                orderDetails,
                Id : user._id
            },{headers:{
                Authorization:token,
            }})
            console.log(response)
                // if(response){
                //     alert("Order placed successfully")
                // }
            }
            catch(err){
                console.error("Error while making the order submit");
                throw err;
            }
        }
    
        setData({
            FirstName: '',
            LastName: '',
            Email: '',
            Number: '',
            Address: ''
        })
        setShowModal(true)
        clearCart();
    }
    const handleClose = async (event) => {
        event.preventDefault();
        setShowModal(false);
        setOrder(false)
        replace('/')
    }

    return (
        <Fragment>
            <form onSubmit={orderHandler}>
                <div className="container">
                    <h4>Order details</h4>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <label>First Name <span className="important">*</span></label>
                            <input
                                type="text"
                                name="FirstName"
                                className="form-control"
                                style={{ border: errors.FirstName ? '2px solid red' : '' }}
                                value={data.FirstName}
                                onChange={handleInput}
                                placeholder="Enter your first name"
                            />
                            {errors.FirstName && <p className='errors'>{errors.FirstName}</p>}
                        </div>
                        <div className="col-6">
                            <label>Last Name <span className="important">*</span></label>
                            <input
                                type="text"
                                name="LastName"
                                style={{ border: errors.LastName ? '2px solid red' : '' }}
                                value={data.LastName}
                                className="form-control"
                                onChange={handleInput}
                                placeholder="Enter your last name"
                            />
                            {errors.LastName && <p className='errors'>{errors.LastName}</p>}
                        </div>
                        <div className="col-6 mt-3">
                            <label>Email <span className="important">*</span></label>
                            <input
                                type="email"
                                name="Email"
                                className="form-control"
                                style={{ border: errors.Email ? '2px solid red' : '' }}
                                value={data.Email}
                                onChange={handleInput}
                                placeholder="Enter your Email"
                            />
                            {errors.Email && <p className='errors'>{errors.Email}</p>}
                        </div>
                        <div className="col-6 mt-3">
                            <label>Mobile Number <span className="important">*</span></label>
                            <input
                                type="number"
                                name="Number"
                                style={{ border: errors.Number ? '2px solid red' : '' }}
                                value={data.Number}
                                className="form-control"
                                onChange={handleInput}
                                placeholder="Enter your Number"
                            />
                            {errors.Number && <p className='errors'>{errors.Number}</p>}
                        </div>
                        <div className="col-12 mt-3">
                            <label>Address <span className="important">*</span></label>
                            <textarea
                                type="text"
                                row='15'
                                col='15'
                                className="form-control"
                                name="Address"
                                style={{ border: errors.Address ? '2px solid red' : '' }}
                                value={data.Address}
                                onChange={handleInput}
                                placeholder="Provide your Address"
                            />
                            {errors.Address && <p className='errors'>{errors.Address}</p>}
                        </div>
                    </div>
                    <button className="btn btn-primary button mt-3" >Save & Continue</button>
                </div>
            </form>

            {showModal && <Modal show={showModal} >
                <Modal.Header>
                    <ModalTitle>Order Notification</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <p>You order is Placed successfully....</p>
                </ModalBody>

                <ModalFooter className="justify-content-center">
                    <button className="btn btn-danger" onClick={handleClose} >
                        Ok
                    </button>
                </ModalFooter>
            </Modal>}
        </Fragment>
    );
}

export default OrderForm;