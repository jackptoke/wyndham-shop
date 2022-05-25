import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import ShopCategory from "../../routes/shop-category/shop-category.component";

<<<<<<< Updated upstream
const Shop = () => {
=======
import { startFetchingCategories } from "../../store/categories/categories.action";

// import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startFetchingCategories());
  }, [dispatch]);

>>>>>>> Stashed changes
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<ShopCategory />} />
    </Routes>
  );
};

export default Shop;
