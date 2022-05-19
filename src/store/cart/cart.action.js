import { createAction } from "../../utility/reducers/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOPen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOPen);

export const addProductToCart = (product) =>
  createAction(CART_ACTION_TYPES.ADD_PRODUCT_TO_CART, product);

export const removeProductFromCart = (product) =>
  createAction(CART_ACTION_TYPES.REMOVE_PRODUCT_FROM_CART, product);

export const clearProductFromCart = (product) =>
  createAction(CART_ACTION_TYPES.CLEAR_PRODUCT_FROM_CART, product);
