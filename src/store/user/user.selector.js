import { createSelector } from "reselect";

//Memoisation to reduce unnecessary computation power
const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
