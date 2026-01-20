import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice.ts'
import authReducer from './slices/authSlice.ts'

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        auth: authReducer
    }
})
