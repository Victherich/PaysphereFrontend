
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top:100px;
  width:100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton2 = styled.button`
  background-color: white;
  color: blue;
  padding: 10px;
  border: 1px solid blue;
  border-radius: 5px;
  cursor: pointer;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap:wrap;
`;

const PreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// function UploadProduct({setCurrentView}) {
//     const userToken = useSelector(state=>state.userToken)
//   const [productData, setProductData] = useState({
//     productName: '',
//     description: '',
//     price: '',
//     category: '',
//     availableStock: '',
//     productImage: [],
//   });

//   const [previewImages, setPreviewImages] = useState([]);

//   const handleInputChange = (e) => {
//     setProductData({
//       ...productData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     if (productData.productImage.length + selectedFiles.length > 5) {
//       Swal.fire('Error', 'You cannot upload more than 5 images', 'error');
//       return;
//     }

//     const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...newImages]);
//     setProductData((prev) => ({
//       ...prev,
//       productImage: [...prev.productImage, ...selectedFiles],
//     }));
//   };

//   const handleRemoveImage = (indexToRemove, e) => {
//     e.preventDefault(); // Prevent form submission
//     setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
//     setProductData((prev) => ({
//       ...prev,
//       productImage: prev.productImage.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('category', productData.category);
//     formData.append('availableStock', productData.availableStock);

//     // Append images
//     for (let i = 0; i < productData.productImage.length; i++) {
//       formData.append('productImage', productData.productImage[i]);
//     }

//     Swal.fire({
//       title: 'Uploading...',
//       text: 'Please wait',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     fetch('https://paysphere-api.vercel.app/upload/product', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${userToken}`,
        
//       },
//       body: formData,
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           Swal.fire('Success', 'Product uploaded successfully', 'success');
//         } else {
//           throw new Error();
//         }
//       })
//       .catch((error) => {
//         Swal.fire({text:'Failed to upload product'});
//         console.error(error)
//       });
  
//   };

//   return (
//     <UploadForm onSubmit={handleSubmit}>
//       <Input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} />
//       <Input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
//       <Input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
//       <Input type="text" name="category" placeholder="Category" onChange={handleInputChange} />
//       <Input type="number" name="availableStock" placeholder="Available Stock" onChange={handleInputChange} />
//       <p>Upload product images (Maximum of 5 images)</p>
//       <Input type="file" multiple accept="image/*" onChange={handleFileChange} />

//       {previewImages.length > 0 && (
//         <ImagePreviewContainer>
//           {previewImages.map((image, index) => (
//             <PreviewWrapper key={index}>
//               <PreviewImage src={image} alt={`Preview ${index + 1}`} />
//               <RemoveButton onClick={(e) => handleRemoveImage(index, e)}>X</RemoveButton>
//             </PreviewWrapper>
//           ))}
//         </ImagePreviewContainer>
//       )}

//       <SubmitButton type="submit">Upload Product</SubmitButton>
//       <SubmitButton2 type="button" onClick={()=>setCurrentView(0)}>Cancel</SubmitButton2>
//     </UploadForm>
//   );
// }

// export default UploadProduct;


function UploadProduct({ setCurrentView }) {
    const userToken = useSelector((state) => state.userToken);
    const [productData, setProductData] = useState({
      productName: '',
      description: '',
      price: '',
      category: '',
      availableStock: '',
      productImage: [],
    });
  
    const [previewImages, setPreviewImages] = useState([]);
  
    const handleInputChange = (e) => {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
  
      if (productData.productImage.length + selectedFiles.length > 5) {
        Swal.fire('Error', 'You cannot upload more than 5 images', 'error');
        return;
      }
  
      const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newImages]);
      setProductData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, ...selectedFiles],
      }));
    };
  
    const handleRemoveImage = (indexToRemove, e) => {
      e.preventDefault(); // Prevent form submission
      setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
      setProductData((prev) => ({
        ...prev,
        productImage: prev.productImage.filter((_, index) => index !== indexToRemove),
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('availableStock', productData.availableStock);
  
      // Append images
      for (let i = 0; i < productData.productImage.length; i++) {
        formData.append('productImage', productData.productImage[i]);
      }
  
      try {
        Swal.fire({
          title: 'Uploading...',
          text: 'Please wait',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        const response = await axios.post('https://paysphere-api.vercel.app/upload/product', formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 201) {
          Swal.fire('Success', 'Product uploaded successfully', 'success');
        }
      } catch (error) {
        if (error.response) {
          // Specific error responses
          if (error.response.status === 400) {
            Swal.fire('Error', 'Missing required fields or no images uploaded', 'error');
          } else if (error.response.status === 404) {
            Swal.fire('Error', 'User not found', 'error');
          } else {
            Swal.fire('Error', 'Failed to upload product. Server error.', 'error');
          }
        } else {
          // Network or other errors
          Swal.fire('Error', 'Failed to upload product. Please try again later.', 'error');
        }
        console.error('Upload failed:', error);
      }
    };
  
    return (
      <UploadForm onSubmit={handleSubmit}>
        <Input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} />
        <Input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
        <Input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
        <Input type="text" name="category" placeholder="Category" onChange={handleInputChange} />
        <Input type="number" name="availableStock" placeholder="Available Stock" onChange={handleInputChange} />
        <p>Upload product images (Maximum of 5 images)</p>
        <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
  
        {previewImages.length > 0 && (
          <ImagePreviewContainer>
            {previewImages.map((image, index) => (
              <PreviewWrapper key={index}>
                <PreviewImage src={image} alt={`Preview ${index + 1}`} />
                <RemoveButton onClick={(e) => handleRemoveImage(index, e)}>X</RemoveButton>
              </PreviewWrapper>
            ))}
          </ImagePreviewContainer>
        )}
  
        <SubmitButton type="submit">Upload Product</SubmitButton>
        <SubmitButton2 type="button" onClick={() => setCurrentView(0)}>
          Cancel
        </SubmitButton2>
      </UploadForm>
    );
  }
  
  export default UploadProduct;
