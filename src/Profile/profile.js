import { useContext, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth, useUser } from '../Header/Store/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Styles from './profile.module.css'
import CartContext from '../Header/Store/Cart-context';

function Example() {
  const { setIsLoggedIn } = useAuth();
  const replace = useNavigate();
  const { user } = useUser();
  const cartCtx = useContext(CartContext);

  const Logout = () => {
    setIsLoggedIn(false)
    cartCtx.clearCart();
    replace('/');
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  return (
    <>
      {/* <Button onClick={handleShow} >
      {user.name}
      </Button> */}
      <span variant="primary" onClick={handleShow} >
        <i class="gg-profile"></i>
      </span>
      <Offcanvas scroll="true" show={show} onHide={handleClose} className={Styles.customise} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Welcome ! </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={Styles.profile}>
            <h5>{user.name}</h5>
            <span>Good to See you...</span> 
            <span className={Styles.span}>Email: {user.email}</span>
            <div className={Styles.Button}>
              <button className='btn btn-primary ' onClick={Logout}>Logout</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;