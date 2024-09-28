// // src/Features/Slice.js
// import { createSlice } from "@reduxjs/toolkit";

// const MySlice = createSlice({
//   name: "user",
//   initialState: {
//     cart: [],
//     wishlist: [],
//     userInfo: null,
//     userToken: null,
//     userAllOrder: [],
//     deliveryDetails: {
//       name: "", email: "", phoneNumber: ""
//     },
//     myCourses:[]
//   },
//   reducers: {
//     addToCart: (state, { payload }) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.cart = [...state.cart, { ...payload }];
//       }
//     },
//     removeFromCart: (state, { payload }) => {
//       state.cart = state.cart.filter((e) => e.id !== payload);
//     },
//     addToWishlist: (state, { payload }) => {
//       const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.wishlist = [...state.wishlist, { ...payload }];
//       }
//     },
//     removeFromWishlist: (state, { payload }) => {
//       state.wishlist = state.wishlist.filter((e) => e.id !== payload);
//     },
//     userLogin: (state, { payload }) => {
//       state.userInfo = payload.userInfo;
//       state.userToken = payload.userToken;
//     },
//     userLogout: (state) => {
//       state.userInfo = null;
//       state.userToken = null;
//     },
//     handleUserAllOrder: (state, { payload }) => {
//       state.userAllOrder = [{ ...payload }, ...state.userAllOrder];
//     },
//     setDeliveryDetails: (state, { payload }) => {
//       state.deliveryDetails = payload;
//     },
//     addToMyCourses: (state) => {
//       state.myCourses = [...state.myCourses, ...state.cart];
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     }
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   addToWishlist,
//   removeFromWishlist,
//   userLogin,
//   userLogout,
//   handleUserAllOrder,
//   setDeliveryDetails,
//   addToMyCourses,
//   clearCart
// } = MySlice.actions;
// export default MySlice.reducer;



// // src/Features/Slice.js
// import { createSlice } from "@reduxjs/toolkit";

// const MySlice = createSlice({
//   name: "user",
//   initialState: {
//     cart: [],
    
//     userInfo: null,
//     userToken: null,
//     userAllOrder: [],
//     productDetail:{},
//     deliveryDetails: {
//       name: "", email: "", phoneNumber: ""
//     },
  

//   },
//   reducers: {
//     setProductDetail: (state, {payload}) => {
//       state.productDetail = payload; // Assign the object from the payload to the state
//     },
//     addToCart: (state, { payload }) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.cart = [...state.cart, { ...payload, quantity: 1 }]; // Initialize quantity to 1
//       } else {
//         state.cart[itemIndex].quantity += 1; // Increase quantity if item already exists
//       }
//     },
//     removeFromCart: (state, { payload }) => {
//       state.cart = state.cart.filter((item) => item.id !== payload);
//     },
//     decreaseQuantity: (state, { payload }) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === payload);
//       if (itemIndex !== -1 && state.cart[itemIndex].quantity > 1) {
//         state.cart[itemIndex].quantity -= 1; // Decrease quantity if more than 1
//       } else {
//         state.cart = state.cart.filter((item) => item.id !== payload); // Remove if quantity is 0
//       }
//     },
//     addToWishlist: (state, { payload }) => {
//       const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.wishlist = [...state.wishlist, { ...payload }];
//       }
//     },
//     removeFromWishlist: (state, { payload }) => {
//       state.wishlist = state.wishlist.filter((item) => item.id !== payload);
//     },
//     userLogin: (state, { payload }) => {
//       state.userInfo = payload.userInfo;
//       state.userToken = payload.userToken;
//     },
//     userLogout: (state) => {
//       state.userInfo = null;
//       state.userToken = null;
//     },
//     handleUserAllOrder: (state, { payload }) => {
//       state.userAllOrder = [{ ...payload }, ...state.userAllOrder];
//     },
//     setDeliveryDetails: (state, { payload }) => {
//       state.deliveryDetails = payload;
//     },
//     addToMyCourses: (state) => {
//       state.myCourses = [...state.myCourses, ...state.cart];
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     },
//     setCurrentProduct: (state, { payload }) => {
//       state.currentProduct = payload; // Set current product details
//     },
//     clearCurrentProduct: (state) => {
//       state.currentProduct = null; // Clear current product details
//     },
//   },
// });

// // Export the actions
// export const {
//   addToCart,
//   removeFromCart,
//   decreaseQuantity,
//   addToWishlist,
//   removeFromWishlist,
//   userLogin,
//   userLogout,
//   handleUserAllOrder,
//   setDeliveryDetails,
//   addToMyCourses,
//   clearCart,
//   setCurrentProduct,
//   clearCurrentProduct,
//   setProductDetail,
// } = MySlice.actions;

// // Export the reducer
// export default MySlice.reducer;

// // src/Features/Slice.js
// import { createSlice } from "@reduxjs/toolkit";

// const MySlice = createSlice({
//   name: "user",
//   initialState: {
//     cart: [],
//     wishlist: [],
//     userInfo: null,
//     userToken: null,
//     userAllOrder: [],
//     productDetail: {},
//     deliveryDetails: {
//       name: "",
//       email: "",
//       phoneNumber: "",
//     },
//     myCourses: [],
//     currentProduct: null, // Initialize currentProduct
//   },
//   reducers: {
//     setProductDetail: (state, { payload }) => {
//       state.productDetail = payload; // Assign the object from the payload to the state
//     },
//     addToCart: (state, { payload }) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.cart.push({ ...payload, quantity: 1 }); // Initialize quantity to 1
//       } else {
//         state.cart[itemIndex].quantity += 1; // Increase quantity if item already exists
//       }
//     },
//     removeFromCart: (state, { payload }) => {
//       state.cart = state.cart.filter((item) => item.id !== payload);
//     },
//     decreaseQuantity: (state, { payload }) => {
//       const itemIndex = state.cart.findIndex((item) => item.id === payload);
//       if (itemIndex !== -1 && state.cart[itemIndex].quantity > 1) {
//         state.cart[itemIndex].quantity -= 1; // Decrease quantity if more than 1
//       } else {
//         state.cart = state.cart.filter((item) => item.id !== payload); // Remove if quantity is 0
//       }
//     },
//     addToWishlist: (state, { payload }) => {
//       const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
//       if (itemIndex === -1) {
//         state.wishlist.push({ ...payload });
//       }
//     },
//     removeFromWishlist: (state, { payload }) => {
//       state.wishlist = state.wishlist.filter((item) => item.id !== payload);
//     },
//     userLogin: (state, { payload }) => {
//       state.userInfo = payload.userInfo;
//       state.userToken = payload.userToken;
//     },
//     userLogout: (state) => {
//       state.userInfo = null;
//       state.userToken = null;
//     },
//     handleUserAllOrder: (state, { payload }) => {
//       state.userAllOrder.unshift({ ...payload }); // Add new order to the beginning
//     },
//     setDeliveryDetails: (state, { payload }) => {
//       state.deliveryDetails = payload;
//     },
//     addToMyCourses: (state) => {
//       state.myCourses.push(...state.cart);
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     },
//     setCurrentProduct: (state, { payload }) => {
//       state.currentProduct = payload; // Set current product details
//     },
//     clearCurrentProduct: (state) => {
//       state.currentProduct = null; // Clear current product details
//     },
//   },
// });

// // Export the actions
// export const {
//   addToCart,
//   removeFromCart,
//   decreaseQuantity,
//   addToWishlist,
//   removeFromWishlist,
//   userLogin,
//   userLogout,
//   handleUserAllOrder,
//   setDeliveryDetails,
//   addToMyCourses,
//   clearCart,
//   setCurrentProduct,
//   clearCurrentProduct,
//   setProductDetail,
// } = MySlice.actions;

// // Export the reducer
// export default MySlice.reducer;



// src/Features/MySlice.js

import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    cart: [],
    wishlist: [],
    userInfo: null,
    userToken: null,
    userAllOrder: [],
    productDetail: {},
    deliveryDetails: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    myCourses: [],
    currentProduct: null, // Initialize currentProduct
    userId: null,
    walletId:null,         // Add userId to the initial state
  },
  reducers: {
    setProductDetail: (state, { payload }) => {
      state.productDetail = payload;
    },
    setUserId: (state, { payload }) => {     // New reducer to set userId
      state.userId = payload;
    },
    setWalletId: (state, { payload }) => {     // New reducer to set userId
      state.walletId = payload;
    },
    addToCart: (state, { payload }) => {
      const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
      if (itemIndex === -1) {
        state.cart.push({ ...payload, quantity: 1 });
      } else {
        state.cart[itemIndex].quantity += 1;
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    decreaseQuantity: (state, { payload }) => {
      const itemIndex = state.cart.findIndex((item) => item.id === payload);
      if (itemIndex !== -1 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== payload);
      }
    },
    addToWishlist: (state, { payload }) => {
      const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
      if (itemIndex === -1) {
        state.wishlist.push({ ...payload });
      }
    },
    removeFromWishlist: (state, { payload }) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== payload);
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload.userInfo;
      state.userToken = payload.userToken;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
    handleUserAllOrder: (state, { payload }) => {
      state.userAllOrder.unshift({ ...payload });
    },
    setDeliveryDetails: (state, { payload }) => {
      state.deliveryDetails = payload;
    },
    addToMyCourses: (state) => {
      state.myCourses.push(...state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

// Export the actions
export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  addToWishlist,
  removeFromWishlist,
  userLogin,
  userLogout,
  handleUserAllOrder,
  setDeliveryDetails,
  addToMyCourses,
  clearCart,
  setCurrentProduct,
  clearCurrentProduct,
  setProductDetail,
  setUserId,
  setWalletId,   
} = MySlice.actions;

export default MySlice.reducer;
