import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../Features/Counter/CounterSlice";
import { cardSlice } from "../Features/Card/CardSlice";
import { catalogSlice } from "../Features/Catalog/CatalogSlice";

export const Store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        card: cardSlice.reducer,
        catalog: catalogSlice.reducer
    }
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch 
