'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

  interface ICoinState {
    name: string
  }

   const initialState: ICoinState = {
    name: 'Bitcoin'
   };

   const coinNameSlice = createSlice({
     name: 'coinName',
     initialState,
     reducers: {
       updateName: (state, action: PayloadAction<ICoinState>) => {
         state.name = action.payload.name;
       },
     },
   });

   export const { updateName } = coinNameSlice.actions;

   export default coinNameSlice.reducer;