import { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
  clearProductFromCart,
} from "../../store/cart/cart.action";

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
  const dispatch = useDispatch();

  const { name, imageUrl, quantity, price } = cartItem;

  const increment = () => {
    dispatch(addProductToCart(cartItem));
  };

  const decrement = () => {
    dispatch(removeProductFromCart(cartItem));
  };

  const remove = () => {
    dispatch(clearProductFromCart(cartItem));
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
