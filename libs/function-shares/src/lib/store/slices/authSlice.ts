import { createSlice } from '@reduxjs/toolkit';
import { IProfile } from '@nxseo/model';
import { Storage } from '@capacitor/storage';
// export interface QuantityPickerState {
//   quan: number;
// }
export type AuthState = {
  loading: boolean;
  token?: string;
  profile?: IProfile;
};
// const initialState: QuantityPickerState = { quan: 0 };
const initialState: AuthState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action) {
      state = action.payload;
      return state;
    },
    loginSuccess(state, action) {
      state = action.payload;
      return state;
    },
    loginFail(state, action) {
      state = action.payload;
      return state;
    },
    saveUserInfo(state, action) {
      state = action.payload;
      return state;
    },
    signOut(state, action) {
      clearStorage();
      return initialState;
    },
  },
});

const clearStorage = async () => {
  await Storage.remove({ key: 'token'})
  await Storage.remove({ key: 'profile'})
}
export const { loginSuccess, saveUserInfo, signOut } = authSlice.actions;

export default authSlice.reducer;
