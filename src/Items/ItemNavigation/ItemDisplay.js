import { Fragment, useContext } from "react";
import ItemForm from "./ItemForm";

import CartContext from "../../Header/Store/Cart-context";


const ItemDispaly = (props) => {
    const cartCtx = useContext(CartContext);

    const onAddToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
        
    };
    
    return (
        <Fragment>
            <div className="mx-3">
                <ItemForm onAddToCart={onAddToCartHandler} />
            </div>
        </Fragment>
    )
};
export default ItemDispaly;