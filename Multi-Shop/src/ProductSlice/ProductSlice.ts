import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../Types/ProductType';

interface CartItem extends ProductType {
  qty: number;
}

interface CartState {
  items: CartItem[];
  allQty: number;
  searchProduct: string;
  subTotal: number;
  total: number;
}

const initialState: CartState = {
  items: [],
  allQty: 0,
  searchProduct: "",
  subTotal: 0,
  total: 0,
};

// Helper function to recalculate subtotal and total
const recalculateTotal = (state: CartState) => {
  state.subTotal = state.items.reduce((total, item) => total + item.price, 0);
  state.total = state.subTotal + 10; // Assuming a flat $10 shipping fee
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchProduct = action.payload;
    },

    addAllCartQty: (state) => {
      state.allQty = state.items.reduce((total, item) => total + item.qty, 0);
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        // If item exists, increase the quantity and update the price
        state.items[itemIndex].qty += action.payload.qty;
        state.items[itemIndex].price += action.payload.price;
      } else {
        // If item does not exist, add it to the cart
        state.items.push(action.payload);
      }

      // Update the total quantity of items in the cart
      state.allQty += action.payload.qty;
      
      // Recalculate subtotal and total
      recalculateTotal(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        const itemToRemove = state.items[itemIndex];
        
        // Reduce total quantity by the quantity of the removed item
        state.allQty -= itemToRemove.qty;

        // Remove the item from the cart
        state.items.splice(itemIndex, 1);
      }

      // Recalculate subtotal and total
      recalculateTotal(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.allQty = 0;
      state.subTotal = 0;
      state.total = 0;
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; size: string; qty: number; price:number }>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        const oldQty = state.items[itemIndex].qty;
        const newQty = action.payload.qty;

        // Calculate the price per item based on the current quantity
        const pricePerItem = state.items[itemIndex].price / oldQty;

        // Calculate the new price based on the updated quantity
        const newPrice = newQty * pricePerItem;

        // Update the quantity and price
        state.items[itemIndex].qty = newQty;
        state.items[itemIndex].price = newPrice;

        // Update the total quantity
        state.allQty += newQty - oldQty;

        // Recalculate subtotal and total
        recalculateTotal(state);
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
