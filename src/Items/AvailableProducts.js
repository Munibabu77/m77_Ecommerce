import { NavLink } from "react-router-dom";
import Styles from './AvailableProducts.module.css';
import { useUser} from "../Header/Store/AuthProvider";

const AvailableProducts = [
    {
        id: 1,
        img: "realme.jpeg",
        text: "Shop now",
        path: "/realme"
    },
    {
        id: 2,
        img: "moto.jpg",
        text: "Shop now",
        path: "/moto"
    },
    {
        id: 3,
        img: "apple.jpg",
        text: "Shop now",
        path: "/iphone"
    },
    {
        id: 4,
        img: "vivo.jpg",
        text: "Shop now",
        path: "/vivo"
    }
]

const AvailProducts = () => {
    const { isLoggedIn } = useUser();
    return (
        
            isLoggedIn ? AvailableProducts.map((product) => {
                return (
                    <NavLink key={product.id} to={product.path}>
                        <ul className={Styles.list}>
                            <img src={product.img} alt="product logo" />
                            <li className={Styles.item} id={product.id}><h5>{product.text}</h5></li>
                        </ul>
                    </NavLink>

                )
            }):''
        
    )
};
export default AvailProducts;