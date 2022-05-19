import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartTotalValue,
  selectCartCount,
} from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal,
} from "./checkout.styles";
const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalValue = useSelector(selectCartTotalValue);
  const cartCount = useSelector(selectCartCount);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <CheckoutHeader>
        <HeaderBlock>
          <span>&nbsp;</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Total Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>{cartCount}</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Total Amount</span>
        </HeaderBlock>
        <HeaderBlock>
          <CheckoutTotal>${totalValue}</CheckoutTotal>
        </HeaderBlock>
      </CheckoutHeader>
    </CheckoutContainer>
  );
};

export default Checkout;
