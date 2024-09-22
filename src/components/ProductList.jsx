import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
  padding-top:100px;
`;

const ProductCard = styled.div`
  background-color: white;
  padding: 15px;
  margin: 10px;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin-top: 10px;
`;

function ProductList({setCurrentView}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Swal.fire({
      title: 'Loading...',
      text: 'Fetching products',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    fetch('https://paysphere-api.vercel.app/get_all/products')
      .then((response) => response.json())
      .then((data) => {
        // setProducts(data.products);
        Swal.close();
        alert("yes")
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch products', 'error');
      });
  }, []);

  return (
    <ProductContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.productImage[0]} alt={product.productName} />
          <ProductName>{product.productName}</ProductName>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.availableStock}</p>
        </ProductCard>
      ))}
    </ProductContainer>
  );
}

export default ProductList;
