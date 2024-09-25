// src/components/ProductDetail.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setProductDetail } from '../Features/Slice';
import styled from 'styled-components';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector(state => state.productDetail);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`https://elexdondigitalacademy.com/api3/get_product.php?productId=${productId}`);
      if (response.data.success) {
        dispatch(setProductDetail(response.data.product)); // Set product detail in Redux
      } else {
        console.error('Error fetching product');
      }
    } catch (error) {
      console.error('Error fetching product', error);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail)); // Dispatch to add the current product to the cart
  };

  if (!productDetail.product_name) return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <DetailContainer>
      <Title>{productDetail.product_name}</Title>
      <ImageGallery>
        {productDetail.product_images.map((image, index) => (
          <ProductImage key={index} src={`https://elexdondigitalacademy.com/api3/uploads/${image}`} alt={productDetail.product_name} />
        ))}
      </ImageGallery>
      <Description>{productDetail.description}</Description>
      <Price>Price: ${productDetail.price}</Price>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </DetailContainer>
  );
};

export default ProductDetail;

// Styled Components
const DetailContainer = styled.div`
  padding: 20px;
  margin: auto;
  background-color: #f5f5f5; // Changed to a softer background
  max-width: 800px; // Set a max-width for better layout
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
`;

const Description = styled.p`
  margin: 20px 0;
  font-size: 1.1em;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  color: #007bff;
`;

const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
`;
