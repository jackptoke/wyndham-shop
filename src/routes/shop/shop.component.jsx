import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utility/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import ShopCategory from "../../routes/shop-category/shop-category.component";

import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();

      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<ShopCategory />} />
    </Routes>
  );
};

export default Shop;
