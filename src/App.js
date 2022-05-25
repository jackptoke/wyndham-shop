<<<<<<< Updated upstream
=======
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

>>>>>>> Stashed changes
import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import AboutUs from "./routes/about/about.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

<<<<<<< Updated upstream
const App = () => {
=======
import { checkUserSession } from "./store/user/user.action";
// import { getCurrentUser } from "./utility/firebase/firebase.utils";
// import { setCategories } from "./store/categories/categories.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]); // dispatch is optional here

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     console.log("UseEffect - categoryMap: ", categoryMap);
  //     dispatch(setCategories(categoryMap));
  //   };
  //   getCategoriesMap();
  // }, [dispatch]);

>>>>>>> Stashed changes
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
