import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../Model/IProduct";
import request from "../../api/request";
import { RootState } from "../../Store/Store";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "Catalog/fetchProducts",
    async () => {
        return await request.Catalog.list();
    }
)

export const fetchProductsById = createAsyncThunk<IProduct, number>(
    "Catalog/fetchProductsById",
    async (productId) => {
        return await request.Catalog.details(productId);
    }
)

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts"
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.isLoaded = true
            state.status = "idle"
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle"
        });

        builder.addCase(fetchProductsById.pending, (state) => {
            state.status = "pendingFetchProductById"
        });
        builder.addCase(fetchProductsById.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle"
        });
        builder.addCase(fetchProductsById.rejected, (state) => {
            state.status = "idle"
        });
    })
})

export const {
    selectById: selectProductById,
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.catalog);
