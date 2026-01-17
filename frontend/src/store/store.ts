import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice.ts'

export const store = configureStore({
    reducer: {
        token: tokenReducer
    }
})
