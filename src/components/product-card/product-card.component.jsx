// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice,
} from "./product-card.styles";

import { addProductToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  // const { addItemToCart } = useContext(CartContext);

  const onClickHandler = () => dispatch(addProductToCart(product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt="" />
      <ProductCardFooter>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardPrice>{price}</ProductCardPrice>
      </ProductCardFooter>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={onClickHandler}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
  // return (
  //   <div className="product-card-container">
  //     <img src={imageUrl} alt="" />
  //     <div className="footer">
  //       <span className="name">{name}</span>
  //       <span className="price">${price}</span>
  //     </div>
  //     <Button
  //       buttonType={BUTTON_TYPE_CLASSES.inverted}
  //       onClick={addProductToCart}
  //     >
  //       Add to Cart
  //     </Button>
  //   </div>
  // );
};

export default ProductCard;
