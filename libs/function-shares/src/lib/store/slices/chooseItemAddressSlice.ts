import { createSlice } from '@reduxjs/toolkit';

export type ChooseItemAddessState = {
  name: string;
  phone: number;
  other: string;
  typeAddress: any;
  sessionDelivery: any;
  default: boolean;

  confirmLocation: string;
  city: any;
  dist: any;
  ward: any;
  lat: any;
  lng: any;
};

// const initialState: QuantityPickerState = { quan: 0 };
export const initItemAddessState: ChooseItemAddessState = {
  name: '',
  phone: NaN,
  other: '',
  typeAddress: {
    id: 1,
    name: 'Nhà riêng',
  },
  sessionDelivery: '',
  default: false,

  confirmLocation: '',
  city: '',
  dist: '',
  ward: '',
  lat: '',
  lng: '',
};

const chooseItemAddressSlice = createSlice({
  name: 'ItemAddress',
  initialState: initItemAddessState,
  reducers: {
    chooseItemAddress(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { chooseItemAddress } = chooseItemAddressSlice.actions;

export default chooseItemAddressSlice.reducer;
