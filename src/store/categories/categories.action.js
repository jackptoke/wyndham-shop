import { createAction } from "../../utility/reducers/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { getCategoriesAndDocuments } from "../../utility/firebase/firebase.utils";

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const startFetchingCategories = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const finishFetchingCategories = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const failedFetchingCategories = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(startFetchingCategories());
  try {
    const categoriesArray = await getCategoriesAndDocuments("categories");
    dispatch(finishFetchingCategories(categoriesArray));
  } catch (error) {
    dispatch(failedFetchingCategories(error));
  }
};
