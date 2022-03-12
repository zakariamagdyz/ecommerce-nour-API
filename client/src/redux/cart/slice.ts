import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IProduct {
  _id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface CartState {
  items: IProduct[];
}

const initialState = {
  items: [],
} as CartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      // Check if product with same id & size & color is exist
      const product = state.items.find(
        (item) =>
          item._id === action.payload._id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    clear(state, action: PayloadAction<IProduct>) {
      const productInx = state.items.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (productInx > -1) state.items.splice(productInx, 1);
    },
    remove(state, action: PayloadAction<IProduct>) {
      const productInx = state.items.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (action.payload.quantity > 1) state.items[productInx].quantity -= 1;
      else state.items.splice(productInx, 1);
    },

    increase(state, action: PayloadAction<IProduct>) {
      const product = state.items.find(
        (item) =>
          item._id === action.payload._id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (product) product.quantity += 1;
    },
    clearAllCart(state) {
      state.items = [];
    },
  },
});

export const selectAmount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

export const { addToCart, remove, clear, increase, clearAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
