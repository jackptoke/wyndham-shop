import { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, totalValue, cartCount } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <div className="checkout-header">
        <div className="header-block">
          <span>&nbsp;</span>
        </div>
        <div className="header-block">
          <span>Total Quantity</span>
        </div>
        <div className="header-block">
          <span>{cartCount}</span>
        </div>
        <div className="header-block">
          <span>Total Amount</span>
        </div>
        <div className="header-block">
          <span className="total">${totalValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;