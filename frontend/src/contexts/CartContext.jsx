import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, addToCart as apiAddToCart } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart(user.id)
        .then(items => setCartItems(items))
        .catch(() => setCartItems([]));
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (book) => {
    if (!user) return;
    await apiAddToCart(user.id, book.id, 1);
    const items = await fetchCart(user.id);
    setCartItems(items);
  };

  const removeFromCart = async (bookId) => {
    if (!user) return;
    await apiAddToCart(user.id, bookId, 0); // 0 means remove
    const items = await fetchCart(user.id);
    setCartItems(items);
  };

  const updateQuantity = async (bookId, quantity) => {
    if (!user) return;
    await apiAddToCart(user.id, bookId, quantity);
    const items = await fetchCart(user.id);
    setCartItems(items);
  };

  const clearCart = async () => {
    if (!user) return;
    // Remove all items by setting quantity to 0 for each
    await Promise.all(cartItems.map(item => apiAddToCart(user.id, item.id, 0)));
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      items: [...cartItems],
      total: getTotalPrice(),
      status: 'pending',
      date: new Date().toISOString(),
      ...orderData
    };

    setOrders(prev => {
      const updatedOrders = [newOrder, ...prev];
      localStorage.setItem('bookmart_orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    clearCart();
    return newOrder;
  };

  const value = {
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    createOrder
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};