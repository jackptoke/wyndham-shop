import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as WSLogo } from "../../assets/crown.svg";

import { useState, useEffect } from "react";
import ToggleButton from "../../components/toggle-button/toggle-button.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utility/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import {
  NavigationContainer,
  NavLinksContainer,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const NavigationBar = () => {
  const [language, setLanguage] = useState("ကညီ");
  const [shopLink, setShopLink] = useState("SHOP");
  const [aboutUsLink, setAboutUsLink] = useState("ABOUT US");
  const [signInLink, setSignInLink] = useState("SIGN IN");

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
            <NavLink as="span" onClick={signOutUser}>
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
      {/*<div className="navigation">
        <Link className="logo-container" to="/">
          <WSLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            {shopLink}
          </Link>
          <Link className="nav-link" to="/about-us">
            {aboutUsLink}
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              {signInLink}
            </Link>
          )}
          <CartIcon />
          <ToggleButton
            onClickHandler={onLanguageChange}
            text={language}
            className="toggle-button"
          />
        </div>
        {isCartOpen && <CartDropdown />}
          </div>*/}
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
