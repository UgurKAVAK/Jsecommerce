import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../Features/Counter/CounterSlice";
import { cardSlice } from "../Features/Card/CardSlice";
import { catalogSlice } from "../Features/Catalog/CatalogSlice";
import { accountSlice } from "../Features/Account/AccountSlice";
import { useDispatch, useSelector } from "react-redux";

export const Store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        card: cardSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer
    }
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch 

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
