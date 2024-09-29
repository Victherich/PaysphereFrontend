


// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setProductDetail } from '../Features/Slice';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const [mainImage, setMainImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const [manualOverride, setManualOverride] = useState(false); 

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (productDetail.product_images?.length > 0) {
      const firstImage = productDetail.product_images[0]; // Set the first image as the default
      setMainImage(firstImage);
      setCurrentImageIndex(0);
    }
  }, [productDetail]);

  // Slideshow effect
  useEffect(() => {
    if (!manualOverride && productDetail.product_images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === productDetail.product_images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [manualOverride, productDetail.product_images]);

  useEffect(() => {
    if (productDetail.product_images?.length > 0) {
      setMainImage(productDetail.product_images[currentImageIndex]);
    }
  }, [currentImageIndex, productDetail.product_images]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://elexdondigitalacademy.com/api3/get_product.php?productId=${productId}`
      );
      if (response.data.success) {
        dispatch(setProductDetail(response.data.product));
      } else {
        console.error('Error fetching product');
      }
    } catch (error) {
      console.error('Error fetching product', error);
    }
  };

  const handleImageClick = (image, index) => {
    setMainImage(image);
    setCurrentImageIndex(index);
    setManualOverride(true); 
    setTimeout(() => setManualOverride(false), 10000); 
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));
    Swal.fire({ text: 'Item added to Cart', icon: 'success' });
  };

  if (!productDetail.product_name) return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <DetailPageWrap>
        <DetailContainer>
      <Title>{productDetail.product_name}</Title>
      <ProductDetailA>
      <ImageSection>
        <MainImage
          src={`https://elexdondigitalacademy.com/api3/uploads/${mainImage}`}
          alt={productDetail.product_name}
        />
        <ThumbnailGallery>
          {productDetail.product_images.map((image, index) => (
            <Thumbnail
              key={index}
              src={`https://elexdondigitalacademy.com/api3/uploads/${image}`}
              alt={`${productDetail.product_name} thumbnail ${index + 1}`}
              onClick={() => handleImageClick(image, index)}
              active={mainImage === image}
            />
          ))}
        </ThumbnailGallery>
      </ImageSection>
      <DescriptionWrap>
      <Description>{productDetail.description}</Description>
      <Price>Price: ${productDetail.price}</Price>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>  
      <AddToCartButton2 onClick={()=>window.history.back()}>Back</AddToCartButton2>

      </DescriptionWrap>
      </ProductDetailA>
    </DetailContainer>
    
    </DetailPageWrap>
  );
};

export default ProductDetail;
const DetailPageWrap = styled.div`
  padding-top:70px;
  padding-bottom:70px;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  // background-color:blue;
`

// Styled Components
const DetailContainer = styled.div`
  max-width: 1200px;
  width:100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content:center;
  align-items:center;

`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: rgba(0,0,255,0.5);
  margin-bottom: 20px;
  display:flex;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  // max-width: 800px;
  // margin: 0 auto;
  width:100%;
  
  @media (min-width: 768px) {
    // flex-direction: column;
  }
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 300px;
  height:250px;
  // height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const ThumbnailGallery = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  overflow-x: auto;
  flex-wrap:wrap;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid ${({ active }) => (active ? '#007bff' : 'transparent')};
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #007bff;
  }
`;


const DescriptionWrap = styled.div`
  //  display:flex;
  flex-direction:column;
  gap:10px;
  align-items:flex-start;
  justify-content:flex-start;
  width:100%;
  // background-color:red;
`


const Description = styled.p`
  font-size: 1.1rem;
  // line-height: 1.6;
  color: #555;
  margin-top: 10px;
  // padding: 0 15px;
  text-align: left;
 
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(0,0,255,0.5);
  // text-align: center;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  align-self: center;
  background-color:rgba(0,0,255,0.5);
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top:20px;
  margin-right:10px;

  &:hover {
    background-color: #0056b3;
    // transform: scale(1.05);
  }
`;

const AddToCartButton2 = styled.button`
  align-self: center;
  background-color:white;
  color: blue;
  padding: 12px 25px;
  border: 1px solid blue;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top:20px;

  &:hover {
    // background-color: #0056b3;
    // transform: scale(1.05);
  }
`;


const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  padding: 50px;
  color: #007bff;
`;

const ProductDetailA = styled.div`
  display:flex;
  gap:50px;
  width:100%;
  // padding:10px;
  // background-color:red;
@media(max-width:884px){
  flex-direction:column;
}
`