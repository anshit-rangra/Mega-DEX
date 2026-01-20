import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth/login";
import { registerUser } from "../../api/auth/register";

interface initial {
    user: object,
    loading: boolean,
    error: null | string | undefined,
    isAuthenticated: boolean,

    
}

const checkInitialAuth = (): boolean => {
    return document.cookie.includes("authToken") || !!localStorage.getItem("auth-token");
}

export const loginTheUser = createAsyncThunk(
    "auth/loginUser",
    async (form: {username:string, password: string}) => {
        const response = await loginUser(form);
        return { status: response.status, data: response.data };
    }
)

export const registerTheUser = createAsyncThunk(
    "auth/registerUser",
    async (form: {username:string, password: string, profile?: string}) => {
        const response = await registerUser(form);
        return { status: response.status, data: response.data };
    }
)

const initialState: initial = {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: checkInitialAuth(),
}


const authSlice = createSlice({
    name: "authantication",
    initialState: initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTheUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginTheUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;

                if(action.payload.status === 200) {
                    state.isAuthenticated = true;
                }
            })
            .addCase(loginTheUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerTheUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerTheUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;

                if(action.payload.status === 201) {
                    state.isAuthenticated = true
                }
            })
            .addCase(registerTheUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }

})


export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;