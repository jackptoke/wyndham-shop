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

//Add a product into the cart
//if the item is already in the cart, increase its quantity by 1
//if the item is not in the cart already, add one into the cart
const addAnItemToCart = (cartItems, productToAdd) => {
  const itemFound = cartItems.find((item) => item.id === productToAdd.id);
  if (itemFound) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...productToAdd, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//reduce the quantity of the product by 1
const removeAnItemFromCart = (cartItems, productToRemove) => {
  const itemFound = cartItems.find((item) => item.id === productToRemove.id);
  if (itemFound && itemFound.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

//Remove every single item of the product from the cart
const clearCart = (cartItems, productToRemove) => {
  const itemFound = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (itemFound) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return [...cartItems];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  //Count the total number of items in the cart
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  //Calculate the total value of the cart
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

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeAnItemFromCart(cartItems, productToRemove));
  };

  const clearItemsFromCart = (productToRemove) => {
    setCartItems(clearCart(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemsFromCart,
    cartItems,
    cartCount,
    totalValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
