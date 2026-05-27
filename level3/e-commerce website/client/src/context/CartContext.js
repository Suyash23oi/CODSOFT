import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loadCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    const { data } = await api.post('/cart', { productId, qty });
    setCart(data);
  };

  const updateCart = async (cartItems) => {
    const { data } = await api.put('/cart', { cartItems });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, loadCart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
