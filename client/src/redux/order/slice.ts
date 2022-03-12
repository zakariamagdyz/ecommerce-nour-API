import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../cart/slice";
import { RootState } from "../store";

interface IContact {
  email: string;
  billing_details: object;
}
export interface IOrder {
  userId?: string;
  items: IProduct[];
  amount: number;
  contact: IContact;
}

type orderState = {
  purchasedOrder: null | IOrder;
  error: string | null;
};
const initialState = {
  purchasedOrder: null,
  error: null,
} as orderState;

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<IOrder>) {
      state.purchasedOrder = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const selectOrder = (state: RootState) => state.order.purchasedOrder;

export const { setOrder, setError, clearError } = orderSlice.actions;

export default orderSlice.reducer;
