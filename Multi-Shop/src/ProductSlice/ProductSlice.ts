import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../Types/ProductType';

interface CartItem extends ProductType {
  qty: number;
}

interface CartState {
  items: CartItem[];
  allQty: number;
  searchProduct: string;
}

const initialState: CartState = {
  items: [],
  allQty: 0,
  searchProduct: "",
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchProduct = action.payload;
    },

    // Update addAllCartQty
    addAllCartQty: (state) => {
      state.allQty = state.items.reduce((total, item) => total + item.qty, 0);
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
      // Update total quantity
      state.allQty += action.payload.qty;
    },

    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        const itemToRemove = state.items[itemIndex];
        state.allQty -= itemToRemove.qty; // Update total quantity
        state.items.splice(itemIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.allQty = 0;
    },

    // New action to update the quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string; qty: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        const oldQty = state.items[itemIndex].qty;
        const newQty = action.payload.qty;
        state.allQty += newQty - oldQty;

        state.items[itemIndex].qty = newQty;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addAllCartQty,
  searchProduct,
  updateQuantity,
} = productSlice.actions;

export default productSlice.reducer;
