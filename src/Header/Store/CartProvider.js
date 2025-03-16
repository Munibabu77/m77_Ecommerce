import { useEffect, useReducer } from "react";
import CartContext from "./Cart-context";
import { useUser } from "./AuthProvider";
import { useAuth } from "./AuthProvider";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        };

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    };

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR_CART') {
        return defaultCartState;
    }

    if (action.type === 'SET_ITEMS') {
        const items = action.items || [];
        return {
            items: items ? items : [],
            totalAmount: calculateTotalAmount(items)
        }
    }

    if(action.type === 'LOAD'){
        return action.cart;
    }

    return defaultCartState;
};

const calculateTotalAmount = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return 0
    }
    let totalAmount = 0;
    for (const item of items) {
        totalAmount += item.price * item.amount;
    };
    return totalAmount
}

const CartProvider = props => {
    const { isLoggedIn } = useAuth();
    const user = useUser();
    const [cartState, dispatchCart] = useReducer(cartReducer, JSON.parse(localStorage.getItem(`cart_${user._id}`)) || defaultCartState);


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(`cart_${user._id}`));
        if (storedCart) {
            dispatchCart({ type: 'LOAD', cart: storedCart });
        } else {
            dispatchCart({ type: 'CLEAR' });
        }
    }, [user._id]);

    useEffect(() => {
        if (user && user.user._id) {
            localStorage.setItem(`cart_${user._id}`, JSON.stringify(cartState));
        }
    }, [isLoggedIn]);


    const addItemToCartHandler = item => {
        dispatchCart({ type: "ADD", item: item });

    };

    const removeItemFromCart = id => {
        dispatchCart({ type: "REMOVE", id: id });

    };
    const clearCart = () => {
        dispatchCart({ type: 'CLEAR_CART' });
    }




    const setItems = (items) => {
        console.log(items)
        dispatchCart({ type: 'SET_ITEMS', items });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCart,
        clearCart,
        setItems,
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider