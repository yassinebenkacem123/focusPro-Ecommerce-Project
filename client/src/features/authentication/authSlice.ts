import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
const initialState = {
    id: null as number | null,
    username: "" as string,
    email: "" as string,
    roles: [] as string[],
    initialized: false as boolean,
    loading: false as boolean,
    error: null as string | null
}

const extractErrorMessage = (payload: unknown): string | null => {
    if (!payload) return null;
    if (typeof payload === 'string') return payload;

    if (typeof payload === 'object') {
        const maybeMessage = (payload as any).message;
        if (typeof maybeMessage === 'string' && maybeMessage.trim()) return maybeMessage;

        const values = Object.values(payload as Record<string, unknown>);
        const firstString = values.find((v) => typeof v === 'string' && v.trim());
        if (typeof firstString === 'string') return firstString;

        try {
            return JSON.stringify(payload);
        } catch {
            return null;
        }
    }

    return null;
};

// login :
export const login = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });

        }
    }
)

// logout :
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/auth/logout");
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });
        }
    }
)

// register : (self-signup always becomes ROLE_USER on backend)
export const register = createAsyncThunk(
    "auth/register",
    async (payload: { username: string; email: string; password: string }, thunkAPI) => {
        try {
            const response = await api.post("/auth/signup", payload);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });
        }
    }
)

// forget password : sends reset link
export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (payload: { email: string }, thunkAPI) => {
        try {
            const response = await api.post(
                "/auth/forget-password",
                null,
                { params: { email: payload.email } }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });
        }
    }
)

// reset password : sets a new password using token
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload: { token: string; newPassword: string }, thunkAPI) => {
        try {
            const response = await api.post(
                "/auth/reset-password",
                { newPassword: payload.newPassword },
                { params: { token: payload.token } }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });
        }
    }
)

// fetch current authenticated user (cookie-based)
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/auth/user");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data ?? { message: error?.message });
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = extractErrorMessage(action.payload);
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.initialized = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.roles = action.payload.roles;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = extractErrorMessage(action.payload);
        });
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.initialized = true;
            state.id = null;
            state.username = "";
            state.email = "";
            state.roles = [];
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = extractErrorMessage(action.payload);
        });

        builder.addCase(forgetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(forgetPassword.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = extractErrorMessage(action.payload);
        });

        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = extractErrorMessage(action.payload);
        });

        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.initialized = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.roles = action.payload.roles;
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.initialized = true;
            // If cookie is missing/expired, keep user logged out.
            state.id = null;
            state.username = "";
            state.email = "";
            state.roles = [];
            state.error = extractErrorMessage(action.payload);
        });
    },

});

export default authSlice.reducer;