import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as WSLogo } from "../../assets/crown.svg";

import { useState, useEffect } from "react";
import ToggleButton from "../../components/toggle-button/toggle-button.component";

import { signOutStart } from "../../store/user/user.action";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

import {
  NavigationContainer,
  NavLinksContainer,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("ကညီ");
  const [shopLink, setShopLink] = useState("SHOP");
  const [aboutUsLink, setAboutUsLink] = useState("ABOUT US");
  const [signInLink, setSignInLink] = useState("SIGN IN");

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  console.log("Navigation - current user: ", currentUser);

  useEffect(() => {
    if (language !== "EN") {
      setShopLink("SHOP");
      setAboutUsLink("ABOUT US");
      setSignInLink("SIGN IN");
    } else {
      setShopLink("ကျး");
      setAboutUsLink("ပဂ့ၢ်ပကျိၤ");
      setSignInLink("နုာ်လီၤ");
    }
  }, [language]);

  const onLanguageChange = (event) => {
    let newLang = language === "EN" ? "ကညီ" : "EN";
    setLanguage(newLang);
  };

  const onSignOutClicked = () => {
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <WSLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">{shopLink}</NavLink>
          <NavLink to="/about-us">{aboutUsLink}</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={onSignOutClicked}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">{signInLink}</NavLink>
          )}
          <CartIcon />
          <ToggleButton
            onClickHandler={onLanguageChange}
            text={language}
            className="toggle-button"
          />
          {isCartOpen && <CartDropdown />}
        </NavLinksContainer>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
