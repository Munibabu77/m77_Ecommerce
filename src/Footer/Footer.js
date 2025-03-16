import React, { Fragment } from "react";
import Styles from './Footer.module.css'

const Footer = () => {
    return (
        <Fragment>
            <div className={Styles.Menu}>
                <div className="container d-flex justify-content-center">
                    <span className={Styles.items}>
                        <ul>
                            <li className={Styles.items}><h6>About</h6></li>
                            <li className={Styles.items}>Contact us</li>
                            <li className={Styles.items}>About us</li>
                            <li className={Styles.items}>Mobiee Store</li>
                        </ul>
                    </span>
                    <span className={Styles.item1}>
                        <ul className={Styles.style}>
                            <li><h6>Social</h6></li>
                            <li>Google</li>
                            <li>Facebook</li>
                            <li>Instagram</li>
                        </ul>
                    </span>
                    <span className={Styles.item2}>
                        <ul className={Styles.style}>
                            <li><h6>Contact us</h6></li>
                            <li>Gmail :- mobishopee@gmail.com</li>
                            <li>Mobile:- 9908935503</li>
                            <li>Address:- 1-23/43 Henur cross, Bengaluru , Karnataka</li>
                        </ul>
                    </span>
                </div>
            </div>

        </Fragment>
    )
}
export default Footer;