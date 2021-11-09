import React, { createContext, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const value = {
    cart: 'working',
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useCart = () => useContext(CartContext);

export default useCart;
