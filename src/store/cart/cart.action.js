import { createAction } from "../../utility/reducers/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (isCartOPen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOPen);

export const addProductToCart = (cartItems, product) => {
  const newCartItems = addAnItemToCart(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeProductFromCart = (cartItems, product) => {
  const newCartItems = removeAnItemFromCart(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearProductFromCart = (cartItems, product) => {
  const newCartItems = clearItemFromCart(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
