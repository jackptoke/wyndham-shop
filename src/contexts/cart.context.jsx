import { createContext, useReducer } from "react";
import { createAction } from "../utility/reducers/reducer.utils";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  totalValue: 0,
});

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  REMOVE_ALL_THE_ITEM_FROM_CART: "REMOVE_ALL_THE_ITEM_FROM_CART",
  COUNT_ITEMS_IN_CART: "COUNT_ITEMS_IN_CART",
  CALCULATE_CART_TOTAL_VALUE: "CALCULATE_CART_TOTAL_VALUE",
};

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

const cartReducer = (state, action) => {
  console.log("Action(cartReducer): ", action);
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      const { cartItems, cartCount, cartTotal } = payload;
      return {
        ...state,
        cartItems: cartItems,
        cartCount: cartCount,
        totalValue: cartTotal,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const countItemsInCart = (newCartItems) => {
  return newCartItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateCartTotalValue = (newCartItems) => {
  return newCartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalValue: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, totalValue }, dispatch] =
    useReducer(cartReducer, INITIAL_CART_STATE);
  //Count the total number of items in the cart

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = countItemsInCart(newCartItems);
    const newCartTotal = calculateCartTotalValue(newCartItems);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addAnItemToCart(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeAnItemFromCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemsFromCart = (productToRemove) => {
    const newCartItems = clearCart(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
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
