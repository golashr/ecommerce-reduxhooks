import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Heading, InputBox, ThumbnailGallery, AppHeader, InputText } from './styles';
import { createEcommerceRequest } from 'Components/ecommerce/ecommerce.actions';
import CalculatePrice from 'Components/ecommerce/CalculatePrice';
import Header from 'Components/ecommerce/Header';

function SKUList() {
  const dispatch = useDispatch();
  const ecommerceSKUs = useSelector(state => state.ecommerceSKUs.SKUList);

  useEffect(() => {
    dispatch(createEcommerceRequest());
    // return () => {
    //   cleanup;
    // };
  }, []);
  return (
    <>
      <Header />
      <ThumbnailGallery>
        {ecommerceSKUs && ecommerceSKUs.payload && ecommerceSKUs.payload.data && (
          <div>
            <CalculatePrice skuItems={ecommerceSKUs.payload.data} />
          </div>
        )}
      </ThumbnailGallery>
    </>
  );
}

export default SKUList;
