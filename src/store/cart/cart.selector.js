import { createSelector } from "reselect";
//Memoisation of selector
const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalValue = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
