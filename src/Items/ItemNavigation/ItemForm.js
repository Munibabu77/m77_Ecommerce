import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import Styles from "./Item.module.css";
import { useAuth } from "../../Header/Store/AuthProvider";




const ItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    // const [cart, setCart] = useState(false);
    const amountInputRef = useRef();
    const { isLoggedIn } = useAuth();


    
    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 ||
            enteredAmount < 1 ||
            enteredAmount > 5) {

            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
        
    };
    return (
        <form className={Styles.from} onSubmit={submitHandler}>
            <Input
                label="Quantity"
                ref={amountInputRef}
                input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    defaultValue: '1'
                }}/>
             {isLoggedIn && <button className="btn btn-primary" >Add to cart</button>}
            {!amountIsValid && <p>Please enter a valid Quantity</p>}
        </form>
    );
};
export default ItemForm;