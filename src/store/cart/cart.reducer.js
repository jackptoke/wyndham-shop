import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalValue: 0,
};

export const cartReducer = (state = INITIAL_CART_STATE, action) => {
  // console.log("Action(cartReducer): ", action);
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    default:
      return state;
  }
};
