import { createContext, useState, useEffect, useReducer } from "react";

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

const countCart = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateCartValue = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const cartReducer = (state, action) => {
  console.log("Action(cartReducer): ", action);
  const { type, payload } = action;
  const { cartItems } = state;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addAnItemToCart(cartItems, payload),
      };
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeAnItemFromCart(cartItems, payload),
      };
    case CART_ACTION_TYPES.REMOVE_ALL_THE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearCart(cartItems, payload),
      };
    case CART_ACTION_TYPES.COUNT_ITEMS_IN_CART:
      return {
        ...state,
        cartCount: countCart(cartItems),
      };
    case CART_ACTION_TYPES.CALCULATE_CART_TOTAL_VALUE:
      return { ...state, totalValue: calculateCartValue(cartItems) };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalValue: 0,
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [totalValue, setTotalValue] = useState(0);
  const [{ isCartOpen, cartItems, cartCount, totalValue }, dispatch] =
    useReducer(cartReducer, INITIAL_CART_STATE);
  //Count the total number of items in the cart

  // const setCartItems = (cartItems) => dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN})

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // //Calculate the total value of the cart
  // useEffect(() => {
  //   const newTotalValue = cartItems.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  //   setTotalValue(newTotalValue);
  // }, [cartItems]);

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };

  const addItemToCart = (productToAdd) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });
    dispatch({ type: CART_ACTION_TYPES.COUNT_ITEMS_IN_CART, payload: null });
    dispatch({
      type: CART_ACTION_TYPES.CALCULATE_CART_TOTAL_VALUE,
      payload: null,
    });
    // setCartItems(addAnItemToCart(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: productToRemove,
    });
    dispatch({ type: CART_ACTION_TYPES.COUNT_ITEMS_IN_CART, payload: null });
    dispatch({
      type: CART_ACTION_TYPES.CALCULATE_CART_TOTAL_VALUE,
      payload: null,
    });
    // setCartItems(removeAnItemFromCart(cartItems, productToRemove));
  };

  const clearItemsFromCart = (productToRemove) => {
    // setCartItems(clearCart(cartItems, productToRemove));
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ALL_THE_ITEM_FROM_CART,
      payload: productToRemove,
    });
    dispatch({ type: CART_ACTION_TYPES.COUNT_ITEMS_IN_CART, payload: null });
    dispatch({
      type: CART_ACTION_TYPES.CALCULATE_CART_TOTAL_VALUE,
      payload: null,
    });
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
