// src/components/ProductLandingPage2.js

import React, { useContext, useEffect } from 'react';
import Hero from './Hero';
import Services from './Services';
import Product from './Product';
import StoreFooter from './StoreFooter';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../Features/Slice'; 
import { useSelector } from 'react-redux';
import { setWalletId } from '../Features/Slice';
import { Context } from './Context';

const ProductLandingPage2 = () => {
  const { userId2 } = useParams();  // Retrieve userId2 from route params
  const dispatch = useDispatch();
  const {walletID}=useParams();
  const {afterOrderNav,setAfterOrderNav}=useContext(Context)

  const userId = useSelector(state=>state.userId)
  console.log(userId)

  useEffect(() => {
    if (userId2) {
      dispatch(setUserId(userId2));  // Dispatch the setUserId action with userId2
    }
  }, [dispatch, userId2]);

  useEffect(() => {
    if (walletID) {
      dispatch(setWalletId(walletID));  
    }
  }, [dispatch, userId2]);

  useEffect(()=>{
    setAfterOrderNav(false)
  },[])

  return (
    <div>
      <Hero />
      <Services />
      <Product />
  
    </div>
  );
};

export default ProductLandingPage2;
