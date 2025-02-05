import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "../../Model/ICard";
import request from "../../api/request";

interface CardState {
    card: Card | null;
    status: string;
}

const initialState : CardState = {
    card: null,
    status: "idle"
}

export const addItemToCard = createAsyncThunk<Card, {productId: number, quantity?: number}>(
    "card/addItemToCard",
    async ({productId,quantity=1}) => {
        try {
            return await request.Card.addItem(productId,quantity);            
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteItemFromCard = createAsyncThunk<Card, {productId: number, quantity?: number, key?: string}>(
    "card/deleteItemFromCard",
    async ({productId,quantity=1}) => {
        try {
            return await request.Card.deleteItem(productId,quantity);           
        } catch (error) {
            console.log(error);
        }
    }
);

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCard: (state, action) => {
            state.card = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCard.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addItemToCard.fulfilled, (state, action) => {
            console.log(action);
            state.card = action.payload;
            state.status = "idle";
        });
        builder.addCase(addItemToCard.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCard.pending, (state, action) => {
            console.log(action);
            state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
        });
        builder.addCase(deleteItemFromCard.fulfilled, (state, action) => {
            state.card = action.payload;
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCard.rejected, (state) => {
            state.status = "idle";
        });
    }
});

export const {setCard} = cardSlice.actions
