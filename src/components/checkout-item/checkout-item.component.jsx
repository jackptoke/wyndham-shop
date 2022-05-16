import { Fragment, useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  CheckoutImageContainer,
  CheckoutImage,
  CheckoutProductName,
  CheckoutProductQuantity,
  CheckoutProductQuantityValue,
  CheckoutProductPrice,
  CheckoutQuantityArrow,
  CheckoutRemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;

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
      <CheckoutItemContainer>
        <CheckoutImageContainer>
          <CheckoutImage src={imageUrl} width="100px" alt={name} />
        </CheckoutImageContainer>
        <CheckoutProductName>{name}</CheckoutProductName>
        <CheckoutProductQuantity>
          <CheckoutQuantityArrow onClick={decrement}>
            &#10096;
          </CheckoutQuantityArrow>
          <CheckoutProductQuantityValue>
            {quantity}
          </CheckoutProductQuantityValue>
          <div className="arrow" onClick={increment}>
            &#10097;
          </div>
        </CheckoutProductQuantity>
        <CheckoutProductPrice>${price}</CheckoutProductPrice>
        <CheckoutRemoveButton onClick={remove}>&#10060;</CheckoutRemoveButton>
      </CheckoutItemContainer>
    </Fragment>
  );
};

export default CheckoutItem;
