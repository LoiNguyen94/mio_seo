import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const tabPositionSlice = createSlice({
  name: 'AddTabPosition',
  initialState,
  reducers: {
    setTabPosition(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setTabPosition } = tabPositionSlice.actions;

export default tabPositionSlice.reducer;
