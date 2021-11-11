import React, { createContext, useContext } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const CartContext = createContext();

const CART_ENDPOINT = 'https://store.darlena.shop/wp-json/rae/v1/cart/items';

const config = {
  headers: {
    'x-headless-CMS': true,
  },
  withCredentials: true,
};

const cartFetcher = (CART_ENDPOINT) =>
  axios.get(CART_ENDPOINT, config).then((res) => res.data);

export function CartProvider({ children }) {
  const { data, error } = useSWR(CART_ENDPOINT, cartFetcher);

  const value = {
    cart: data,
    isLoading: !data && !error,
    isError: error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useCart = () => useContext(CartContext);

export default useCart;
