import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-top:100px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
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

function SearchProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Searching...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetch(`/search/products?searchProducts=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        Swal.close();
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to search products', 'error');
      });
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch}>
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search Products"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>

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
    </>
  );
}

export default SearchProduct;
