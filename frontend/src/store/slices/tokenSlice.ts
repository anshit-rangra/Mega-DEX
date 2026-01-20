import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTokens } from "../../api/tokens/allTokens";
import { toast } from "react-toastify";

interface initial {
    tokens: [],
    loading: boolean,
    error: null | string | undefined
    
}

const initialState: initial = {
    tokens: [],
    loading: false,
    error: null 
}

export const fetchAllTokens = createAsyncThunk(
    'tokens/fetchTokens',
    async () => {
        const response = await getAllTokens()
        
        if(response.status === 200){
            return response.data.pools
        } else {
            toast.error(response.data.message)
        }
    }
)

const tokenSlice = createSlice({
    name: "token",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTokens.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllTokens.fulfilled, (state, action) => {
                state.loading = false;
                state.tokens = action.payload
            })
            .addCase(fetchAllTokens.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default tokenSlice.reducer;