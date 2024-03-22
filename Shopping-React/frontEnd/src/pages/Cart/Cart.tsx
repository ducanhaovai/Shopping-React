// Cart.js
import React from "react";
import { useCart } from "../../context/CarContext";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
