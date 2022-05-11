import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  totalValue: 0,
});

const addAnItemToCart = (cartItems, productToAdd) => {
  const itemFound = cartItems.find((item) =>
    item.id === productToAdd.id ? true : false
  );
  if (itemFound) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...productToAdd, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalValue = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotalValue(newTotalValue);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addAnItemToCart(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    totalValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
