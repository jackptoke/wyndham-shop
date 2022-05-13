import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, totalValue, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const navigateToCheckout = useNavigate();
  const onClick = () => {
    setIsCartOpen(!isCartOpen);
    navigateToCheckout("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        <h2>Total: ${totalValue}</h2>
      </div>
      <Button onClick={onClick}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
