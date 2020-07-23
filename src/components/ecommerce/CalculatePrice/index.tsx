import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ULList,
  LIList,
  SkuName,
  SkuDetails,
  AddButton,
  Heading,
  TotalPrice,
  EcommerceRow,
  EcommerceSku,
  EcommerceSpace,
} from './styles';
import { checkoutRequest } from 'Components/ecommerce/ecommerce.actions';
import Checkout from 'Utils/checkout';

function CalculatePrice({ skuItems }) {
  const [cartArray, setCartArray] = useState([]);

  const dispatch = useDispatch();

  const price = useSelector(state => state.ecommerceSKUs.checkoutPrice);

  const renderSKUItems = (item: any, index: number) => {
    return (
      // tslint:disable-next-line: jsx-no-lambda
      <LIList key={item.sku}>
        <img src={item.img} alt={item.name} width="250" height="250" />
        <SkuName>
          <strong>Name: </strong>
          {item.name}
        </SkuName>
        <SkuDetails>
          <strong>SKU: </strong>
          {item.sku}
        </SkuDetails>
        <SkuDetails>
          <strong>Price: $</strong>
          {item.price}
        </SkuDetails>
        <AddButton
          type="submit"
          onClick={() => {
            scanItems(item);
          }}
        >
          <strong>Submit</strong>
        </AddButton>
      </LIList>
    );
  };

  const scanItems = async item => {
    const checkout = new Checkout();
    checkout.scan(item);
    const listOfProducts = checkout.cumulateProducts([...cartArray, item], skuItems);
    dispatch(checkoutRequest(listOfProducts));
    await setCartArray(prevCartArray => [...prevCartArray, item]);
  };

  return (
    <React.Fragment>
      <ULList>{skuItems.map((item, index) => renderSKUItems(item, index))}</ULList>
      <TotalPrice>
        <Heading>Total - ${price && price.payload}</Heading>
        {cartArray &&
          cartArray.map((cart, index) => {
            return (
              <EcommerceRow key={index}>
                <EcommerceSku>{cart.name}</EcommerceSku>
                <EcommerceSpace>: </EcommerceSpace>
                <EcommerceSpace>${cart.price}</EcommerceSpace>
              </EcommerceRow>
            );
          })}
      </TotalPrice>
    </React.Fragment>
  );
}

export default CalculatePrice;
