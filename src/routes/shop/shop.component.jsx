import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import ShopCategory from "../../routes/shop-category/shop-category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<ShopCategory />} />
    </Routes>
  );
};

export default Shop;
