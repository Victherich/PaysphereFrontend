

// // export default UploadProduct;
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
// const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// function UploadProduct({ setCurrentView }) {
//   const userInfo = useSelector(state => state.userInfo);
  
//   const [productData, setProductData] = useState({
//     userId: userInfo._id,
//     productName: '',
//     description: '',
//     price: '',
//     availableStock: '',
//     productImages: [],
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
    
//     // Check for max images
//     if (productData.productImages.length + selectedFiles.length > 4) {
//       Swal.fire('Error', 'You cannot upload more than 4 images', 'error');
//       return;
//     }

//     // Validate file sizes and types
//     const invalidFiles = selectedFiles.filter(file => 
//       file.size > MAX_FILE_SIZE || !VALID_IMAGE_TYPES.includes(file.type)
//     );

//     if (invalidFiles.length > 0) {
//       const invalidFileNames = invalidFiles.map(file => file.name).join(', ');
//       Swal.fire('Error', `Invalid file types or sizes detected: ${invalidFileNames}`, 'error');
//       return;
//     }

//     const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...newImages]);
//     setProductData((prev) => ({
//       ...prev,
//       productImages: [...prev.productImages, ...selectedFiles],
//     }));
//   };

//   const handleRemoveImage = (indexToRemove) => {
//     setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
//     setProductData((prev) => ({
//       ...prev,
//       productImages: prev.productImages.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('availableStock', productData.availableStock);
//     formData.append('userId', productData.userId);
//     productData.productImages.forEach((image) => formData.append('productImages[]', image));

//     try {
//       Swal.fire({
//         title: 'Uploading...',
//         text: 'Please wait',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const response = await axios.post('https://elexdondigitalacademy.com/api3/upload_product.php', formData);
//       if (response.data.success) {
//         Swal.fire('Success', response.data.message, 'success');
//         setCurrentView(0); 
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'There was an error uploading the product.', 'error');
//     }
//   };

//   return (
//     <UploadFormWrap>
//       <UploadForm onSubmit={handleSubmit}>
//       <Input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} />
//       <Input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
//       <Input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
//       <Input type="number" name="availableStock" placeholder="Available Stock" onChange={handleInputChange} />
//       <p>Upload product images (Maximum of 4 images, max size for each file is 2MB. Supported files are Jpeg, png,)</p>
//       <Input type="file" multiple accept="image/*" onChange={handleFileChange} />

//       {previewImages.length > 0 && (
//         <ImagePreviewContainer>
//           {previewImages.map((image, index) => (
//             <PreviewWrapper key={index}>
//               <PreviewImage src={image} alt={`Preview ${index + 1}`} />
//               <RemoveButton type="button" onClick={() => handleRemoveImage(index)}>X</RemoveButton>
//             </PreviewWrapper>
//           ))}
//         </ImagePreviewContainer>
//       )}

//       <SubmitButton type="submit">Upload Product</SubmitButton>
//       {/* <SubmitButton2 type="button" onClick={() => setCurrentView(0)}>
//         Cancel
//       </SubmitButton2> */}
//     </UploadForm>
//     </UploadFormWrap>
//   );
// }

// export default UploadProduct;

// const UploadFormWrap = styled.div`
//   width:100%;
//   background-color:rgba(255,255,255,0.7);
// `



// const UploadForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   padding-top:100px;
  
//   width:70%;
//   margin:0 auto;
//   // background-color:rgba(255,255,255,0.7);
  
//   @media(max-width:884px){
//     width:100%;
//   }

// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const SubmitButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-bottom:50px;
// `;

// const SubmitButton2 = styled.button`
//   background-color: white;
//   color: blue;
//   padding: 10px;
//   border: 1px solid blue;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const ImagePreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const PreviewWrapper = styled.div`
//   position: relative;
//   display: inline-block;
// `;

// const PreviewImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   border-radius: 5px;
//   border: 1px solid #ccc;
// `;

// const RemoveButton = styled.button`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background-color: red;
//   color: white;
//   border: none;
//   border-radius: 50%;
//   width: 20px;
//   height: 20px;
//   cursor: pointer;
//   font-size: 12px;
// `;






import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function UploadProduct({ setCurrentView }) {
  const userInfo = useSelector(state => state.userInfo);
  
  const [productData, setProductData] = useState({
    userId: userInfo._id,
    productName: '',
    description: '',
    price: '',
    availableStock: '',
    productImages: [],
    type: 'product' // Default type
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
    
    // Check for max images
    if (productData.productImages.length + selectedFiles.length > 4) {
      Swal.fire('Error', 'You cannot upload more than 4 images', 'error');
      return;
    }

    // Validate file sizes and types
    const invalidFiles = selectedFiles.filter(file => 
      file.size > MAX_FILE_SIZE || !VALID_IMAGE_TYPES.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map(file => file.name).join(', ');
      Swal.fire('Error', `Invalid file types or sizes detected: ${invalidFileNames}`, 'error');
      return;
    }

    const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newImages]);
    setProductData((prev) => ({
      ...prev,
      productImages: [...prev.productImages, ...selectedFiles],
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setProductData((prev) => ({
      ...prev,
      productImages: prev.productImages.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('availableStock', productData.availableStock);
    formData.append('userId', productData.userId);
    formData.append('type', productData.type); // Add type to form data
    productData.productImages.forEach((image) => formData.append('productImages[]', image));

    try {
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post('https://elexdondigitalacademy.com/api3/upload_product.php', formData);
      if (response.data.success) {
        Swal.fire('Success', response.data.message, 'success');
        setCurrentView('storeinfo'); 

      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error uploading the product.', 'error');
    }
  };

  return (
    <UploadFormWrap>
      <UploadForm onSubmit={handleSubmit}>
        <Input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} />
        <Input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
        <Input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
        <Input type="number" name="availableStock" placeholder="Available Stock" onChange={handleInputChange} />

        {/* Dropdown for Type */}
        <Select name="type" value={productData.type} onChange={handleInputChange}>
          <option value="product">Product</option>
          <option value="service">Service</option>
        </Select>

        <p>Upload product images (Maximum of 4 images, max size for each file is 2MB. Supported files are Jpeg, png,)</p>
        <Input type="file" multiple accept="image/*" onChange={handleFileChange} />

        {previewImages.length > 0 && (
          <ImagePreviewContainer>
            {previewImages.map((image, index) => (
              <PreviewWrapper key={index}>
                <PreviewImage src={image} alt={`Preview ${index + 1}`} />
                <RemoveButton type="button" onClick={() => handleRemoveImage(index)}>X</RemoveButton>
              </PreviewWrapper>
            ))}
          </ImagePreviewContainer>
        )}

        <SubmitButton type="submit">Upload Product</SubmitButton>
      </UploadForm>
    </UploadFormWrap>
  );
}

export default UploadProduct;

const UploadFormWrap = styled.div`
  width:100%;
  background-color:rgba(255,255,255,0.7);
  padding:10px;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top:100px;
  
  width:70%;
  margin:0 auto;

  @media(max-width:884px){
    width:100%;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
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
  margin-bottom:50px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
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
`;

