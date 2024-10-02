import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../Types/ProductType';

interface CartItem extends ProductType {
  qty: number;
}

interface CartState {
  items: CartItem[];
  allQty: number;
}

const initialState: CartState = {
  items: [],
  allQty: 0,
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addAllCartQty: (state) => {
      state.allQty += 1;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        const itemToRemove = state.items[itemIndex];

        // Update total quantity
        state.allQty -= itemToRemove.qty;
        // Remove the item from cart
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.allQty = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, addAllCartQty } = productSlice.actions;
export default productSlice.reducer;
