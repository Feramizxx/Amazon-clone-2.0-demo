import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
      const findIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );

      if (findIndex === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[findIndex].quantity += 1;
      }
    },
    removeFromBasket: (state: BasketState, action: PayloadAction<Product>) => {
      const findItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if(state.items[findItemIndex].quantity > 0){
        state.items[findItemIndex].quantity -=1
        if(state.items[findItemIndex].quantity == 0){
          state.items.splice(findItemIndex,1)
        }
      }
    },

    addForQuantity: (state:BasketState, action: PayloadAction<Product>)=>{
    state.items=[...state.items, action.payload]
      }
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket,addForQuantity } = basketSlice.actions;
export const selectBasketItems = (state: RootState) => state.basketSlice.items;
export const selectTotalItems = (state: RootState) =>
  state.basketSlice.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
