import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalValue: 0,
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
const clearItemFromCart = (cartItems, productToRemove) => {
  const itemFound = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (itemFound) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return [...cartItems];
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

const getNewCartPayload = (newCartItems) => {
  const newCartCount = countItemsInCart(newCartItems);
  const newTotalValue = calculateCartTotalValue(newCartItems);
  return {
    cartItems: newCartItems,
    cartCount: newCartCount,
    totalValue: newTotalValue,
  };
};

export const cartReducer = (state = INITIAL_CART_STATE, action) => {
  console.log("Action(cartReducer): ", action);
  const { type, payload } = action;
  const { cartItems } = state;
  let newCartItems, updatedCartInfo;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.ADD_PRODUCT_TO_CART:
      newCartItems = addAnItemToCart(cartItems, payload);
      updatedCartInfo = getNewCartPayload(newCartItems);
      return { ...state, ...updatedCartInfo };
    case CART_ACTION_TYPES.REMOVE_PRODUCT_FROM_CART:
      newCartItems = removeAnItemFromCart(cartItems, payload);
      updatedCartInfo = getNewCartPayload(newCartItems);
      return {
        ...state,
        ...updatedCartInfo,
      };
    case CART_ACTION_TYPES.CLEAR_PRODUCT_FROM_CART:
      newCartItems = clearItemFromCart(cartItems, payload);
      updatedCartInfo = getNewCartPayload(newCartItems);
      return { ...state, ...updatedCartInfo };
    default:
      return state;
  }
};
