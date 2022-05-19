import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  selectCartItems,
  selectCartTotalValue,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  // const { cartItems, totalValue, isCartOpen, setIsCartOpen } =
  //   useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalValue = useSelector(selectCartTotalValue);
  const isCartOpen = useSelector(selectIsCartOpen);

  const navigateToCheckout = useNavigate();
  const onClick = () => {
    dispatch(setIsCartOpen(!isCartOpen));
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
