import { useContext, useEffect, useState } from "react"
import CartIcon from "../Cart/cartIcon";
import CartContext from "./Store/Cart-context";
import Styles from './CartButton.module.css'

const CartButton = (props) => {
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const [numberOfCartItems, setNumberOfCartItems] = useState(0);

    useEffect(() => {
        if (cartCtx.items) {
            const newNumberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);
            setNumberOfCartItems(newNumberOfCartItems);
        }
    }, [cartCtx.items]);


    const btnStyles = `${Styles.button} ${btnIsHighLighted ? Styles.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false)
        }, 300)

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={btnStyles} onClick={props.onClick}>
            <span className={Styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={Styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default CartButton;