"use client"
import { Loading } from "@/app/components/loading";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}