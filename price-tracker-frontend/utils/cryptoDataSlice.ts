import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   interface CryptoNameState {
     name: string,
   }

   const initialState: CryptoNameState = {
     name: 'Bitcoin'
   };

   const cryptoNameSlice = createSlice({
     name: 'cryptoName',
     initialState,
     reducers: {
       updateName: (state, action: PayloadAction<CryptoNameState>) => {
         state.name = action.payload.name;
       },
     },
   });

   export const { updateName } = cryptoNameSlice.actions;

   export default cryptoNameSlice.reducer;