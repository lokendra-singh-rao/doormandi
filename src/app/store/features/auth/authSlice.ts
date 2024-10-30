// app/store/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface Address {
  hNo: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface User {
  fullname: string;
  email: string;
  phone: number;
  address: [Address];
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin: Date;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    // Replace this with your actual API call
    const response = await axios.post("/api/login");

    // if (!response.status === 200) {
    //   const error = await response.json();
    //   return rejectWithValue(error.message || "Login failed");
    // }

    // const data = await response.json();
    // // Store token in localStorage or cookies if needed
    // localStorage.setItem("token", data.token);

    // return data.user;
  } catch (error) {
    return rejectWithValue((error as Error).message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
