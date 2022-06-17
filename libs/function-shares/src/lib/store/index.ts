import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducers from './reducer';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

// export const initializeStore = () => {
//   return configureStore({
//     reducer: rootReducers,
//   });
// };
export const store = configureStore({
  reducer: rootReducers,
});
export const makeStore: MakeStore<any> = (context: Context) => store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<any>(makeStore, { debug: true });