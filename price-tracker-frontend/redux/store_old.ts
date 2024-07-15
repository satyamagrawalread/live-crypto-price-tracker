import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cryptoDataReducer from '../utils/cryptoDataSlice';

export const store = configureStore({
  reducer: {
    cryptoData: cryptoDataReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
