import { combineReducers } from '@reduxjs/toolkit';

import QuantityPickerSlice from './slices/quantityPickerSlice';
import TabPositionSlice from './slices/tabPositionSlice';
import authSlice from './slices/authSlice';
import ChooseItemAddressSlice from './slices/chooseItemAddressSlice';
import AddressSlice from './slices/addressSlice';
import { RootState } from '.';

const appReducer = combineReducers({
  QuantityPickerSlice,
  TabPositionSlice,
  auth: authSlice,
  ItemAddress: ChooseItemAddressSlice,
  address: AddressSlice,
});
const reducers = (state: any, action: { type: string, payload?: any}) => {
  if (action.type === 'auth/signOut') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducers;
