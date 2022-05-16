import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, totalValue, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const navigateToCheckout = useNavigate();
  const onClick = () => {
    setIsCartOpen(!isCartOpen);
    navigateToCheckout("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Empty Cart</EmptyMessage>
        )}
        {totalValue > 0 ? <h2>Total: ${totalValue}</h2> : ""}
      </CartItems>
      <Button onClick={onClick}>Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
