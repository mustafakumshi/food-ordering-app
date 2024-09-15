import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
           state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
           console.log(current(state.items).indexOf(action.payload))
           state.items.splice(current(state.items).indexOf(action.payload), 1)
        },
        clearCart: (state, action) => {
          state.items.length = 0;
        },
    }
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;