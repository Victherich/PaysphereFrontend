// // src/components/ProductLandingPage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { setProductDetail } from '../Features/Slice';

// const ProductLandingPage = () => {
//   const [products, setProducts] = useState([]);
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserProducts();
//   }, [userId]); // Add userId to the dependency array

//   const fetchUserProducts = async () => {
//     try {
//       const response = await axios.get(`https://elexdondigitalacademy.com/api3/get_user_products.php?userId=${userId}`);
//       if (response.data.success) {
//         setProducts(response.data.products);
//         console.log(products)
//       } else {
//         console.error('Error fetching products');
//       }
//     } catch (error) {
//       console.error('Error fetching products', error);
//     }
//   };


// const handleProductClick = (product) => {
//     dispatch(setProductDetail(product)); 
//     navigate(`/store/${userId}/productdetail/${product.id}`); 
//   };
  

//   return (
//     <Container>
//       <Title>User's Products</Title>
//       {products.length === 0 ? (
//         <Message>No products available.</Message>
//       ) : (
//         <ProductList>
//           {products.map((product) => (
//             <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
//               <ProductImage src={`https://elexdondigitalacademy.com/api3/uploads/${product.product_images[0]}`} alt={product.product_name} />
//               <ProductName>{product.product_name}</ProductName>
//               <ProductDescription>{product.description}</ProductDescription>
//               <ProductPrice>Price: ${product.price}</ProductPrice>
//             </ProductCard>
//           ))}
//         </ProductList>
//       )}
//     </Container>
//   );
// };

// export default ProductLandingPage;

// // Styled Components
// const Container = styled.div`

//   padding: 20px;
//   max-width: 1200px;
//   margin: auto;
  
// `;

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const Message = styled.p`
//   text-align: center;
//   font-size: 18px;
// `;

// const ProductList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;
// `;

// const ProductCard = styled.div`
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 15px;
//   cursor: pointer;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

// const ProductImage = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 8px;
// `;

// const ProductName = styled.h2`
//   font-size: 1.2em;
//   color: #333;
// `;

// const ProductDescription = styled.p`
//   color: #666;
// `;

// const ProductPrice = styled.p`
//   font-weight: bold;
//   color: #007bff;
// `;



import React from 'react'

const ProductlandingPage = () => {
  return (
    <div>
         <div className='heroBody'>
      <article className='heroWrap'>
        <section className='heroLeft'>
          <h1>FROM WITHIN <br />MY SOUL</h1>
          <p>Shop the most appealing products and <br/>services from our store</p>
          <button>All Products</button>
        </section>
        <section className='heroRight'></section>
      </article>
    </div>


      
    </div>
  )
}

export default ProductlandingPage

