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

interface SignupVars {
  fullname: string;
  phone: number | undefined;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk<User, LoginCredentials>(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user", { ...credentials }, { withCredentials: true });

      return response.data.user; // Ensure this matches your API response structure
    } catch (error) {
      return rejectWithValue((error as Error).message || "Login failed");
    }
  }
); 

// Async thunk for signup
export const signUpUser = createAsyncThunk<User, SignupVars>(
  "auth/signup",
  async (signupDetails: SignupVars, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/sign-up", { ...signupDetails }, { withCredentials: true });
      return response.data.user; // Ensure this matches your API response structure
    } catch (error) {
      return rejectWithValue((error as Error).message || "Login failed");
    }
  }
);

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