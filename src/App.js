import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
import AboutUs from "./routes/about/about.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
