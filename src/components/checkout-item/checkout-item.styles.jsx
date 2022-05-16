import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const CheckoutImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`;

export const CheckoutImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const CheckoutProductName = styled.span`
  width: 23%;
`;

export const CheckoutProductQuantity = styled.span`
  width: 23%;
  display: flex;
`;

export const CheckoutProductQuantityValue = styled.span`
  margin: 0 10px;
`;

export const CheckoutProductPrice = styled.span`
  width: 23%;
`;

export const CheckoutQuantityArrow = styled.div`
  cursor: pointer;
`;

export const CheckoutRemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
