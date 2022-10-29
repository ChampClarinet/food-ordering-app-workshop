import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

export interface CartSlice {
  products: Product[];
  total: number;
}
const initialState: CartSlice = {
  products: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.products.push(product);
      state.total += product.total;
    },
  },
});