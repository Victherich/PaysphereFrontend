import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import EditProductModal from './EditProductModal';
import { useSelector } from 'react-redux';

const UserProducts = ({ setCurrentView }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userInfo = useSelector(state => state.userInfo);

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(`https://elexdondigitalacademy.com/api3/get_user_products.php?userId=${userInfo._id}`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error fetching products.', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await axios.delete('https://elexdondigitalacademy.com/api3/delete_product.php', {
          data: { productId }
        });
        if (response.data.success) {
          Swal.fire('Deleted!', response.data.message, 'success');
          fetchUserProducts();
        } else {
          Swal.fire('Error', response.data.error, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'There was an error deleting the product.', 'error');
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id}>
            <H3>{product.product_name}</H3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Available Stock: {product.available_stock}</p>
            <p>Type: {product.type}</p> {/* Display the product type */}
            <ImagePreview src={`https://elexdondigitalacademy.com/api3/uploads/${product.product_images[0]}`} alt={product.product_name} />
            <ButtonContainer>
              <EditButton onClick={() => handleEditProduct(product)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDeleteProduct(product.id)}>Delete</DeleteButton>
            </ButtonContainer>
          </ProductCard>
        ))
      )}

      {modalIsOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={closeModal}
          onUpdate={fetchUserProducts}
        />
      )}
    </Container>
  );
};

export default UserProducts;

const Container = styled.div`
  padding-top: 80px;
  width: 70%;
  margin: 0 auto;

  @media(max-width: 884px) {
    width: 100%;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.8);
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const H3 = styled.h3`
  color: rgba(0, 0, 255, 0.5);
`;
