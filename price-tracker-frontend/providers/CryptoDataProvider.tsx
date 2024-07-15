'use client'
import { Provider } from "react-redux";
import { store } from "../redux/store";

export const CryptoDataProvider = ({children}: {children: React.ReactNode}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}