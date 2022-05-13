import { Fragment, useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, id, imageUrl, quantity, price } = cartItem;

  const { addItemToCart, removeItemFromCart, clearItemsFromCart } =
    useContext(CartContext);

  const increment = () => {
    addItemToCart(cartItem);
  };

  const decrement = () => {
    removeItemFromCart(cartItem);
  };

  const remove = () => {
    clearItemsFromCart(cartItem);
  };

  return (
    <Fragment>
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} width="100px" alt={name} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={decrement}>
            &#10096;
          </div>
          <span className="value">{quantity}</span>
          <div className="arrow" onClick={increment}>
            &#10097;
          </div>
        </span>
        <span className="price">${price}</span>
        <div className="remove-button" onClick={remove}>
          &#10060;
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutItem;
