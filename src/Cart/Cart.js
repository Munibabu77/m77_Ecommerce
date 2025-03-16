import React, { Fragment, useContext, useState } from "react";
import Styles from "./Cart.module.css";
import Modal from "../Items/UI/Modal";
import CartContext from "../Header/Store/Cart-context";
import CartItem from "./CartItems";
import OrderForm from "../Items/UI/Order/Order";


const Cart = (props) => {
    const [order, setOrder] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `Rs: ${cartCtx.totalAmount} /-`;

   

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
        
    };

   

    const hasItems = cartCtx.items.length > 0;
    const cartItems = (
        <ul className={Styles['cart-items']}>
            {cartCtx.items.map((item) =>
            (<CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}

            />))}
        </ul>
    )
    
    const handlerOrder = () => {
        setOrder(true);
    }
    return (
        <Fragment>
            <Modal onHide={props.onHideCart}>
                {!order && <div>
                    {cartItems}
                    <div className={Styles.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                    </div>
                    <div className={Styles.actions}>
                        <button onClick={props.onHideCart} className={Styles['button--alt']}>Close</button>
                        {hasItems && <button className={Styles.button} onClick={handlerOrder}>Order</button>}
                    </div>
                </div>}
                {order && <OrderForm handlerOrder setOrder={setOrder} clearCart = {cartCtx.clearCart} orderDetails={cartCtx.items}/>}
            </Modal>
        </Fragment>
    );
};
export default Cart;