import { useContext } from "react";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import {
  CartItemCount,
  CartIconContainer,
  ShoppingIcon,
} from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <CartItemCount>{cartCount}</CartItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
