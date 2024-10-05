
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice/ProductSlice'; // Import your slice

export const store = configureStore({
  reducer: {
    product: productReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


