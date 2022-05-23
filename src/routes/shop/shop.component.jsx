import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// import { getCategoriesAndDocuments } from "../../utility/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import ShopCategory from "../../routes/shop-category/shop-category.component";

import { fetchCategoriesAsync } from "../../store/categories/categories.action";

// import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<ShopCategory />} />
    </Routes>
  );
};

export default Shop;
