import React, { Fragment } from "react";
import Styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = props => {
    return <div className={Styles.backdrop} onClick={props.onClose} />
};

const ModalOverlay = props => {
    return <div className={Styles.modal}>
        <div className={Styles.content}>
            {props.children}
        </div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onHide} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};
export default Modal;