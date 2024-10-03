
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
// const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
// const MAX_IMAGES = 4; // Maximum number of images

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [productData, setProductData] = useState({
//     userId: '',
//     productName: '',
//     description: '',
//     price: '',
//     availableStock: '',
//     productImages: [],
//   });

//   const [previewImages, setPreviewImages] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (product) {
//       setProductData({
//         userId: product.user_id,
//         productName: product.product_name,
//         description: product.description,
//         price: product.price,
//         availableStock: product.available_stock,
//         productImages: product.product_images.map(img => `uploads/${img}`),
//       });
//       setPreviewImages(product.product_images.map(img => `https://elexdondigitalacademy.com/api3/uploads/${img}`));
//     }
//   }, [product]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = [];

//     // Reset error message
//     setErrorMessage('');

//     // Check the current number of images
//     const currentImagesCount = productData.productImages.length + previewImages.length;

//     // Check if adding the new files would exceed the maximum limit
//     if (currentImagesCount + files.length > MAX_IMAGES) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Image Limit Exceeded',
//             text: `You can upload a maximum of ${MAX_IMAGES} images.`,
//         });
//         return;
//     }

//     for (const file of files) {
//         if (!VALID_IMAGE_TYPES.includes(file.type)) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid File Type',
//                 text: `Invalid file type: ${file.name}. Only JPG, PNG, and GIF are allowed.`,
//             });
//             continue;
//         }

//         if (file.size > MAX_FILE_SIZE) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'File Size Exceeded',
//                 text: `File size exceeds 2MB: ${file.name}`,
//             });
//             continue;
//         }

//         validFiles.push(file);
//         setPreviewImages((prevImages) => [
//             ...prevImages,
//             URL.createObjectURL(file),
//         ]);
//     }

//     if (validFiles.length > 0) {
//         setProductData((prevData) => ({
//             ...prevData,
//             productImages: [...prevData.productImages, ...validFiles],
//         }));
//     }
// };


//   const handleDeleteImage = (index) => {
//     setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     setProductData((prevData) => ({
//       ...prevData,
//       productImages: prevData.productImages.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loadingAlert = Swal.fire({ title: "Updating..." });
//     Swal.showLoading();

//     const formData = new FormData();
//     formData.append('productId', product.id);
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('availableStock', productData.availableStock);
//     formData.append('userId', productData.userId);

//     productData.productImages.forEach((image) => {
//       if (typeof image === 'string') {
//         formData.append('productImages[]', image); // for existing images
//       } else {
//         formData.append('productImages[]', image); // for new images
//       }
//     });

//     try {
//       const response = await axios.post('https://elexdondigitalacademy.com/api3/update_product.php', formData);
//       if (response.data.success) {
//         Swal.fire('Success', response.data.message, 'success');
//         if (onUpdate) onUpdate();
//         onClose();
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'There was an error updating the product.', 'error');
//     } finally {
//       loadingAlert.close();
//     }
//   };

//   return (
//     <ModalContainer>
//       <H2>Edit Product</H2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="productName"
//           value={productData.productName}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           required
//         />
//         <TextArea
//           name="description"
//           value={productData.description}
//           onChange={handleInputChange}
//           placeholder="Product Description"
//           required
//         />
//         <Input
//           type="number"
//           name="price"
//           value={productData.price}
//           onChange={handleInputChange}
//           placeholder="Price"
//           required
//         />
//         <Input
//           type="number"
//           name="availableStock"
//           value={productData.availableStock}
//           onChange={handleInputChange}
//           placeholder="Available Stock"
//           required
//         />
//         <p>Upload only jpeg, png files. Max file size: 2MB</p>
//         <P>Warning: New set of image(s) shall overide the previous ones</P>
//         <ImageInput
//           type="file"
//           multiple
//           accept="image/jpeg, image/png, image/gif"
//           onChange={handleImageChange}
//         />
//         <PreviewContainer>
//           {previewImages.map((image, index) => (
//             <PreviewImageContainer key={index}>
//               <PreviewImage src={image} alt={`Preview ${index + 1}`} />
//               <CloseButton 
//                 type="button" 
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 &times;
//               </CloseButton>
//             </PreviewImageContainer>
//           ))}
//         </PreviewContainer>
//         <Button type="submit">Update Product</Button>
//         <Button2 type="button" onClick={onClose}>Cancel</Button2>
//       </form>
//     </ModalContainer>
//   );
// };

// export default EditProductModal;

// const ModalContainer = styled.div`
//   padding: 20px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.8);
//   width: 100%;
//   height: 100%;
//   padding-top: 100px;
//   padding-bottom: 100px;
//   overflow-y: scroll;
//   padding-left: 100px;
//   padding-right: 100px;

//   @media (max-width: 884px) {
//     padding-left: 10px;
//     padding-right: 10px;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const ImageInput = styled.input`
//   margin: 10px 0;
// `;

// const ErrorText = styled.p`
//   color: red;
//   font-size: 14px;
//   margin: 5px 0;
// `;

// const PreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap; /* Allow wrapping of images */
// `;

// const PreviewImageContainer = styled.div`
//   position: relative;
// `;

// const PreviewImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background: red;
//   border: none;
//   color: red;
//   font-size: 18px;
//   cursor: pointer;
//   color:white;
//   border-radius:50%;
//   width:20px;
//   height:20px;
//   &:hover {
    
//   }
// `;

// const Button = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   background-color: rgba(0, 0, 255, 0.6);
//   color: white;
//   border: none;
//   border-radius: 5px;
// `;

// const Button2 = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: 1px solid blue;
//   background-color: white;
//   color: blue;
// `;

// const H2 = styled.h2`
//   color: rgba(0, 0, 255, 0.7);
// `;

// const P = styled.p`
//     color:red;
//     font-size:0.9rem;
// `




























// // #########################cCODE
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
// const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
// const MAX_IMAGES = 4; // Maximum number of images

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [productData, setProductData] = useState({
//     userId: '',
//     productName: '',
//     description: '',
//     price: '',
//     availableStock: '',
//     productImages: [],
//   });

//   const [fetchedImages, setFetchedImages] = useState([]); // For fetched images
//   const [previewImages, setPreviewImages] = useState([]); // For uploaded images
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (product) {
//       setProductData({
//         userId: product.user_id,
//         productName: product.product_name,
//         description: product.description,
//         price: product.price,
//         availableStock: product.available_stock,
//         productImages: product.product_images.map(img => `uploads/${img}`),
//       });
//       // Set fetched images in a separate container
//       setFetchedImages(product.product_images.map(img => `https://elexdondigitalacademy.com/api3/uploads/${img}`));
//     }
//   }, [product]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = [];

//     // Reset error message
//     setErrorMessage('');

//     // Check the current number of uploaded images
//     const currentImagesCount = previewImages.length;

//     // Check if adding the new files would exceed the maximum limit
//     if (currentImagesCount + files.length > MAX_IMAGES) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Image Limit Exceeded',
//         text: `You can upload a maximum of ${MAX_IMAGES} images.`,
//       });
//       return;
//     }

//     for (const file of files) {
//       if (!VALID_IMAGE_TYPES.includes(file.type)) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid File Type',
//           text: `Invalid file type: ${file.name}. Only JPG, PNG, and GIF are allowed.`,
//         });
//         continue;
//       }

//       if (file.size > MAX_FILE_SIZE) {
//         Swal.fire({
//           icon: 'error',
//           title: 'File Size Exceeded',
//           text: `File size exceeds 2MB: ${file.name}`,
//         });
//         continue;
//       }

//       validFiles.push(file);
//       // Set preview images for the newly uploaded files
//       setPreviewImages((prevImages) => [
//         ...validFiles.map(file => URL.createObjectURL(file)), // Map valid files to their object URLs
//       ]);
//     }

//     // Update product images with the newly uploaded images (overriding old selection)
//     if (validFiles.length > 0) {
//       setProductData((prevData) => ({
//         ...prevData,
//         productImages: validFiles,
//       }));
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     // We need to handle the corresponding productImages as well
//     setProductData((prevData) => ({
//       ...prevData,
//       productImages: prevData.productImages.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loadingAlert = Swal.fire({ title: "Updating..." });
//     Swal.showLoading();

//     const formData = new FormData();
//     formData.append('productId', product.id);
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('availableStock', productData.availableStock);
//     formData.append('userId', productData.userId);

//     // Append the newly uploaded images for submission
//     productData.productImages.forEach((image) => {
//       if (typeof image !== 'string') {
//         formData.append('productImages[]', image); // For new images
//       }
//     });

//     try {
//       const response = await axios.post('https://elexdondigitalacademy.com/api3/update_product.php', formData);
//       if (response.data.success) {
//         Swal.fire('Success', response.data.message, 'success');
//         if (onUpdate) onUpdate();
//         onClose();
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'There was an error updating the product.', 'error');
//     } finally {
//       loadingAlert.close();
//     }
//   };

//   return (
//     <ModalContainer>
//       <H2>Edit Product</H2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="productName"
//           value={productData.productName}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           required
//         />
//         <TextArea
//           name="description"
//           value={productData.description}
//           onChange={handleInputChange}
//           placeholder="Product Description"
//           required
//         />
//         <Input
//           type="number"
//           name="price"
//           value={productData.price}
//           onChange={handleInputChange}
//           placeholder="Price"
//           required
//         />
//         <Input
//           type="number"
//           name="availableStock"
//           value={productData.availableStock}
//           onChange={handleInputChange}
//           placeholder="Available Stock"
//           required
//         />
        
        
        
//         {/* Fetched Images Preview Container */}
//         <FetchedImagesContainer>
//           <H3>Previously Posted Images</H3>
//           <PreviewContainer>
//             {fetchedImages.map((image, index) => (
//               <PreviewImageContainer key={index}>
//                 <PreviewImage src={image} alt={`Fetched Preview ${index + 1}`} />
//               </PreviewImageContainer>
//             ))}
//           </PreviewContainer>
//         </FetchedImagesContainer>


//         <p>Upload only jpeg, png files. Max file size: 2MB</p>
//         <p>You can select up to 4 images at once</p>
//         <P>Warning: New set of image(s) shall override the previously posted images</P>
//         <ImageInput
//           type="file"
//           multiple
//           accept="image/jpeg, image/png, image/gif"
//           onChange={handleImageChange}
//         />
        
//         {/* Uploaded Images Preview Container */}
//         <UploadedImagesContainer>
//           <H3>New Images</H3>
//           <PreviewContainer>
//             {previewImages.map((image, index) => (
//               <PreviewImageContainer key={index}>
//                 <PreviewImage src={image} alt={`Uploaded Preview ${index + 1}`} />
//                 <CloseButton 
//                   type="button" 
//                   onClick={() => handleDeleteImage(index)}
//                 >
//                   &times;
//                 </CloseButton>
//               </PreviewImageContainer>
//             ))}
//           </PreviewContainer>
//         </UploadedImagesContainer>
        
//         <Button type="submit">Update Product</Button>
//         <Button2 type="button" onClick={onClose}>Cancel</Button2>
//       </form>
//     </ModalContainer>
//   );
// };

// export default EditProductModal;

// // Styled components
// const ModalContainer = styled.div`
//   padding: 20px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.8);
//   width: 100%;
//   height: 100%;
//   padding-top: 100px;
//   padding-bottom: 100px;
//   overflow-y: scroll;
//   padding-left: 100px;
//   padding-right: 100px;

//   @media (max-width: 884px) {
//     padding-left: 10px;
//     padding-right: 10px;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const ImageInput = styled.input`
//   margin: 10px 0;
// `;

// const PreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap; /* Allow wrapping of images */
// `;

// const PreviewImageContainer = styled.div`
//   position: relative;
// `;

// const PreviewImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background: red;
//   border: none;
//   color: white;
//   font-size: 18px;
//   cursor: pointer;
//   border-radius: 50%;
//   width: 20px;
//   height: 20px;
// `;

// const FetchedImagesContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const UploadedImagesContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   background-color: rgba(0, 0, 255, 0.6);
//   color: white;
//   border: none;
//   border-radius: 5px;
// `;

// const Button2 = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: 1px solid blue;
//   background-color: white;
//   color: blue;
// `;

// const H2 = styled.h2`
//   color: rgba(0, 0, 255, 0.7);
// `;

// const P = styled.p`
//   color: red;
//   font-size: 0.9rem;
// `;

// const H3 = styled.h3`
//     color: rgba(0, 0, 255, 0.7);
// `











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [productData, setProductData] = useState({
//     userId: '',
//     productName: '',
//     description: '',
//     price: '',
//     availableStock: '',
//     productImages: [],
//   });

//   const [previewImages, setPreviewImages] = useState([]);

//   useEffect(() => {
//     if (product) {
//       setProductData({
//         userId: product.user_id,
//         productName: product.product_name,
//         description: product.description,
//         price: product.price,
//         availableStock: product.available_stock,
//         productImages: product.product_images.map(img => `uploads/${img}`),
//       });
//       setPreviewImages(product.product_images.map(img => `https://elexdondigitalacademy.com/api3/uploads/${img}`));
//     }
//   }, [product]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => {
//       const isValidType = file.type.startsWith('image/');
//       const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB
//       return isValidType && isValidSize;
//     });

//     if (validFiles.length > 4) {
//       Swal.fire('Error', 'You can only upload a maximum of 4 images.', 'error');
//       return;
//     }

//     setPreviewImages(validFiles.map(file => URL.createObjectURL(file)));
//     setProductData((prevData) => ({
//       ...prevData,
//       productImages: validFiles,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loadingAlert = Swal.fire({ title: "Updating..." });
//     Swal.showLoading();

//     const formData = new FormData();
//     formData.append('productId', product.id);
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('availableStock', productData.availableStock);
//     formData.append('userId', productData.userId);

//     productData.productImages.forEach((image) => {
//       if (typeof image === 'string') {
//         formData.append('productImages[]', image); // for existing images
//       } else {
//         formData.append('productImages[]', image); // for new images
//       }
//     });

//     try {
//       const response = await axios.post('https://elexdondigitalacademy.com/api3/update_product.php', formData);
//       if (response.data.success) {
//         Swal.fire('Success', response.data.message, 'success');
//         if (onUpdate) onUpdate();
//         onClose();
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'There was an error updating the product.', 'error');
//     } finally {
//       loadingAlert.close();
//     }
//   };

//   return (
//     <ModalContainer>
//       <H2>Edit Product</H2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="productName"
//           value={productData.productName}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           required
//         />
//         <TextArea
//           name="description"
//           value={productData.description}
//           onChange={handleInputChange}
//           placeholder="Product Description"
//           required
//         />
//         <Input
//           type="number"
//           name="price"
//           value={productData.price}
//           onChange={handleInputChange}
//           placeholder="Price"
//           required
//         />
//         <Input
//           type="number"
//           name="availableStock"
//           value={productData.availableStock}
//           onChange={handleInputChange}
//           placeholder="Available Stock"
//           required
//         />
//         <ImageInput
//           type="file"
//           multiple
//           onChange={handleImageChange}
//         />
//         <PreviewContainer>
//           {previewImages.map((image, index) => (
//             <PreviewImage key={index} src={image} alt={`Preview ${index + 1}`} />
//           ))}
//         </PreviewContainer>
//         <Button type="submit">Update Product</Button>
//         <Button2 type="button" onClick={onClose}>Cancel</Button2>
//       </form>
//     </ModalContainer>
//   );
// };

// export default EditProductModal;

// const ModalContainer = styled.div`
//   padding: 20px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.8);
//   width: 100%;
//   height: 100%;
//   padding-top: 100px;
//   padding-bottom: 100px;
//   overflow-y: scroll;
//   padding-left: 100px;
//   padding-right: 100px;

//   @media (max-width: 884px) {
//     padding-left: 10px;
//     padding-right: 10px;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const ImageInput = styled.input`
//   margin: 10px 0;
// `;

// const PreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const PreviewImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
// `;

// const Button = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   background-color: rgba(0, 0, 255, 0.6);
//   color: white;
//   border: none;
//   border-radius: 5px;
// `;

// const Button2 = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: 1px solid blue;
//   background-color: white;
//   color: blue;
// `;

// const H2 = styled.h2`
//   color: rgba(0, 0, 255, 0.7);
// `;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import styled from 'styled-components';

// const EditProductModal = ({ product, onClose, onUpdate }) => {
//   const [productData, setProductData] = useState({
//     userId: '',
//     productName: '',
//     description: '',
//     price: '',
//     availableStock: '',
//     productImages: [],
//   });

//   const [previewImages, setPreviewImages] = useState([]);

//   useEffect(() => {
//     if (product) {
//       setProductData({
//         userId: product.user_id,
//         productName: product.product_name,
//         description: product.description,
//         price: product.price,
//         availableStock: product.available_stock,
//         productImages: product.product_images.map(img => `uploads/${img}`),
//       });
//       setPreviewImages(product.product_images.map(img => `https://elexdondigitalacademy.com/api3/uploads/${img}`));
//     }
//   }, [product]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const fileSizeExceeded = files.some(file => file.size > 2 * 1024 * 1024); // Check for files larger than 2MB

//     if (fileSizeExceeded) {
//       Swal.fire('Error', 'One or more files exceed the 2MB limit. Please choose smaller files.', 'error');
//       e.target.value = ''; // Clear the input
//       setPreviewImages([]); // Clear preview images
//       setProductData((prevData) => ({
//         ...prevData,
//         productImages: [], // Clear images in state
//       }));
//       return; // Exit the function
//     }

//     const validFiles = files.filter(file => file.type.startsWith('image/')); // Accept only image types

//     if (validFiles.length > 4) {
//       Swal.fire('Error', 'You can only upload a maximum of 4 images.', 'error');
//       e.target.value = ''; // Clear the input
//       return; // Exit the function
//     }

//     setPreviewImages(validFiles.map(file => URL.createObjectURL(file)));
//     setProductData((prevData) => ({
//       ...prevData,
//       productImages: validFiles,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loadingAlert = Swal.fire({ title: "Updating..." });
//     Swal.showLoading();

//     const formData = new FormData();
//     formData.append('productId', product.id);
//     formData.append('productName', productData.productName);
//     formData.append('description', productData.description);
//     formData.append('price', productData.price);
//     formData.append('availableStock', productData.availableStock);
//     formData.append('userId', productData.userId);

//     productData.productImages.forEach((image) => {
//       if (typeof image === 'string') {
//         formData.append('productImages[]', image); // for existing images
//       } else {
//         formData.append('productImages[]', image); // for new images
//       }
//     });

//     try {
//       const response = await axios.post('https://elexdondigitalacademy.com/api3/update_product.php', formData);
//       if (response.data.success) {
//         Swal.fire('Success', response.data.message, 'success');
//         if (onUpdate) onUpdate();
//         onClose();
//       } else {
//         Swal.fire('Error', response.data.error, 'error');
//       }
//     } catch (error) {
//       Swal.fire('Error', 'There was an error updating the product.', 'error');
//     } finally {
//       loadingAlert.close();
//     }
//   };

//   return (
//     <ModalContainer>
//       <H2>Edit Product</H2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="productName"
//           value={productData.productName}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           required
//         />
//         <TextArea
//           name="description"
//           value={productData.description}
//           onChange={handleInputChange}
//           placeholder="Product Description"
//           required
//         />
//         <Input
//           type="number"
//           name="price"
//           value={productData.price}
//           onChange={handleInputChange}
//           placeholder="Price"
//           required
//         />
//         <Input
//           type="number"
//           name="availableStock"
//           value={productData.availableStock}
//           onChange={handleInputChange}
//           placeholder="Available Stock"
//           required
//         />
//         <ImageInput
//           type="file"
//           multiple
//           onChange={handleImageChange}
//         />
//         <PreviewContainer>
//           {previewImages.map((image, index) => (
//             <PreviewImage key={index} src={image} alt={`Preview ${index + 1}`} />
//           ))}
//         </PreviewContainer>
//         <Button type="submit">Update Product</Button>
//         <Button2 type="button" onClick={onClose}>Cancel</Button2>
//       </form>
//     </ModalContainer>
//   );
// };

// export default EditProductModal;

// const ModalContainer = styled.div`
//   padding: 20px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.8);
//   width: 100%;
//   height: 100%;
//   padding-top: 100px;
//   padding-bottom: 100px;
//   overflow-y: scroll;
//   padding-left: 100px;
//   padding-right: 100px;

//   @media (max-width: 884px) {
//     padding-left: 10px;
//     padding-right: 10px;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   margin: 10px 0;
//   padding: 10px;
//   outline: none;
// `;

// const ImageInput = styled.input`
//   margin: 10px 0;
// `;

// const PreviewContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const PreviewImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
// `;

// const Button = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   background-color: rgba(0, 0, 255, 0.6);
//   color: white;
//   border: none;
//   border-radius: 5px;
// `;

// const Button2 = styled.button`
//   margin: 10px 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: 1px solid blue;
//   background-color: white;
//   color: blue;
// `;

// const H2 = styled.h2`
//   color: rgba(0, 0, 255, 0.7);
// `;















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [productData, setProductData] = useState({
    userId: '',
    productName: '',
    description: '',
    price: '',
    availableStock: '',
    productImages: [],
    type: 'product', // Default value, can be either 'product' or 'service'
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (product) {
      setProductData({
        userId: product.user_id,
        productName: product.product_name,
        description: product.description,
        price: product.price,
        availableStock: product.available_stock,
        productImages: product.product_images.map(img => `uploads/${img}`),
        type: product.type || 'product', // Prefill type, default to 'product'
      });
      setPreviewImages(product.product_images.map(img => `https://hotsalesng.com/api3/uploads/${img}`));
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileSizeExceeded = files.some(file => file.size > 2 * 1024 * 1024); // Check for files larger than 2MB

    if (fileSizeExceeded) {
      Swal.fire('Error', 'One or more files exceed the 2MB limit. Please choose smaller files.', 'error');
      e.target.value = ''; // Clear the input
      setPreviewImages([]); // Clear preview images
      setProductData((prevData) => ({
        ...prevData,
        productImages: [], // Clear images in state
      }));
      return; // Exit the function
    }

    const validFiles = files.filter(file => file.type.startsWith('image/')); // Accept only image types

    if (validFiles.length > 4) {
      Swal.fire('Error', 'You can only upload a maximum of 4 images.', 'error');
      e.target.value = ''; // Clear the input
      return; // Exit the function
    }

    setPreviewImages(validFiles.map(file => URL.createObjectURL(file)));
    setProductData((prevData) => ({
      ...prevData,
      productImages: validFiles,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const loadingAlert = Swal.fire({ title: "Updating..." });
  //   Swal.showLoading();

  //   const formData = new FormData();
  //   formData.append('productId', product.id);
  //   formData.append('productName', productData.productName);
  //   formData.append('description', productData.description);
  //   formData.append('price', productData.price);
  //   formData.append('availableStock', productData.availableStock);
  //   formData.append('userId', productData.userId);
  //   formData.append('type', productData.type); // Append the type field

  //   productData.productImages.forEach((image) => {
  //     if (typeof image === 'string') {
  //       formData.append('productImages[]', image); // for existing images
  //     } else {
  //       formData.append('productImages[]', image); // for new images
  //     }
  //   });

  //   try {
  //     const response = await axios.post('https://hotsalesng.com/api3/update_product.php', formData);
  //     if (response.data.success) {
  //       Swal.fire('Success', response.data.message, 'success');
  //       if (onUpdate) onUpdate();
  //       onClose();
  //     } else {
  //       Swal.fire('Error', response.data.error, 'error');
  //     }
  //   } catch (error) {
  //     Swal.fire('Error', 'There was an error updating the product.', 'error');
  //   } finally {
  //     loadingAlert.close();
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({ title: "Updating..." });
    Swal.showLoading();

    const formData = new FormData();
    formData.append('productId', product.id);
    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('availableStock', productData.availableStock);
    formData.append('userId', productData.userId);
    formData.append('type', productData.type); // Append the type field

    // Add existing images only if no new images are uploaded
    if (productData.productImages.length === 0 || productData.productImages.every(img => typeof img === 'string')) {
        // Include existing images if there are no new images
        product.product_images.forEach(image => {
            formData.append('productImages[]', `uploads/${image}`); // For existing images
        });
    } else {
        // Include new images
        productData.productImages.forEach(image => {
            if (typeof image !== 'string') {
                formData.append('productImages[]', image); // for new images
            }
        });
    }

    try {
        const response = await axios.post('https://hotsalesng.com/api3/update_product.php', formData);
        if (response.data.success) {
            Swal.fire('Success', response.data.message, 'success');
            if (onUpdate) onUpdate();
            onClose();
        } else {
            Swal.fire('Error', response.data.error, 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'There was an error updating the product.', 'error');
    } finally {
        loadingAlert.close();
    }
};



  return (
    <ModalContainer>
      <H2>Edit Product</H2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="productName"
          value={productData.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <TextArea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          required
        />
        <Input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <Input
          type="number"
          name="availableStock"
          value={productData.availableStock}
          onChange={handleInputChange}
          placeholder="Available Stock"
          required
        />
        {/* Add Type Selection */}
        <Select
          name="type"
          value={productData.type}
          onChange={handleInputChange}
          required
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
        </Select>
        <p>Upload product images (Select up to 4 images, max size for each file is 2MB. Supported files are Jpeg, png,)
        </p>
        <P>Note that new selection of images shall override the old images when you submitted</P>
        <ImageInput
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <PreviewContainer>
          {previewImages.map((image, index) => (
            <PreviewImage key={index} src={image} alt={`Preview ${index + 1}`} />
          ))}
        </PreviewContainer>
        <Button type="submit">Update</Button>
        <Button2 type="button" onClick={onClose}>Cancel</Button2>
      </form>
    </ModalContainer>
  );
};

export default EditProductModal;

const ModalContainer = styled.div`
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow-y: scroll;
  padding-left: 100px;
  padding-right: 100px;

  @media (max-width: 884px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

const ImageInput = styled.input`
  margin: 10px 0;
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Button = styled.button`
  margin: 10px 5px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: rgba(0, 0, 255, 0.6);
  color: white;
  border: none;
  border-radius: 5px;
`;

const Button2 = styled.button`
  margin: 10px 5px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid blue;
  background-color: white;
  color: blue;
`;

const H2 = styled.h2`
  color: rgba(0, 0, 255, 0.7);
`;
const P = styled.p`
  color:red;
  font-size:0.8rem;
`