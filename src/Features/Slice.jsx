// src/Features/Slice.js
import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    cart: [],
    wishlist: [],
    userInfo: null,
    userToken: null,
    userAllOrder: [],
    deliveryDetails: {
      name: "", email: "", phoneNumber: ""
    },
    myCourses:[]
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
      if (itemIndex === -1) {
        state.cart = [...state.cart, { ...payload }];
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((e) => e.id !== payload);
    },
    addToWishlist: (state, { payload }) => {
      const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
      if (itemIndex === -1) {
        state.wishlist = [...state.wishlist, { ...payload }];
      }
    },
    removeFromWishlist: (state, { payload }) => {
      state.wishlist = state.wishlist.filter((e) => e.id !== payload);
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
      state.userAllOrder = [{ ...payload }, ...state.userAllOrder];
    },
    setDeliveryDetails: (state, { payload }) => {
      state.deliveryDetails = payload;
    },
    addToMyCourses: (state) => {
      state.myCourses = [...state.myCourses, ...state.cart];
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  userLogin,
  userLogout,
  handleUserAllOrder,
  setDeliveryDetails,
  addToMyCourses,
  clearCart
} = MySlice.actions;
export default MySlice.reducer;
