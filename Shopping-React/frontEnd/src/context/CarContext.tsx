import React, { createContext, useContext, useState } from "react";


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const addToCart = (products) => {
    setCart([...cart, products]);
  };

  const getCart = () => {
    return cart;
    console.log(cart);
  };


  const value = {
    cart,
    addToCart,
    getCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
