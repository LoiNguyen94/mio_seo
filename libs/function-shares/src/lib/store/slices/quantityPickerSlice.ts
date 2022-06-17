import { createSlice } from '@reduxjs/toolkit';

// export interface QuantityPickerState {
//   quan: number;
// }

// const initialState: QuantityPickerState = { quan: 0 };
const initialState = 0;

const quantityPickerSlice = createSlice({
  name: 'AddQuantityPicker',
  initialState,
  reducers: {
    setQuantityPicker(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setQuantityPicker } = quantityPickerSlice.actions;

export default quantityPickerSlice.reducer;
