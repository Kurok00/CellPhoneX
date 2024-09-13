import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      setCartCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      ).filter(item => item.quantity > 0);

      // Cập nhật cartCount
      setCartCount(newCart.reduce((count, item) => count + item.quantity, 0));

      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);