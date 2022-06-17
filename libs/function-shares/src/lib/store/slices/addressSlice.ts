import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const addressSlice = createSlice({
  name: 'AddressList',
  initialState,
  reducers: {
    addListAddress(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { addListAddress } = addressSlice.actions;

export default addressSlice.reducer;
