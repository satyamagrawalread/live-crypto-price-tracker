import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store_old";

export interface CryptoState {
    name: string,
    cryptoList: Array<Object>
}

const initialState: CryptoState = {
    name: "Bitcoin",
    cryptoList: []
}

