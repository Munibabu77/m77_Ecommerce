import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Cart from './Cart/Cart';
import NavMenu from './Items/ItemNavigation/NavMenu';
import AvailProducts from './Items/AvailableProducts';
import CartProvider from './Header/Store/CartProvider';
import { AuthProvider } from './Header/Store/AuthProvider';
// import { useUser } from './Header/Store/AuthProvider';




function App() {
  const [cartIsShown, setCartIsShown] = useState(false);


  const showCartHandler = () => {
    setCartIsShown(true);
  };


  const hideCartHandler = () => {
    setCartIsShown(false);
  };





  return (
    <AuthProvider>
      <CartProvider>
        {cartIsShown && <Cart add onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <AvailProducts />
        <NavMenu />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
