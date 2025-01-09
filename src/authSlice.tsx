import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,  // User data (null initially)
  isAuthenticated: false,  // Whether the user is logged in
  loading: false,  // To track the loading state
  error: null,  // To handle any error during auth actions
};

// Create a slice of the auth state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login (set loading state to true)
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Login success (store user data and set authenticated to true)
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    // Login failure (set error and reset loading state)
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Logout (clear user data and set authenticated to false)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Set user data (for example, after Google Sign-In)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

// Export reducer to be used in store
export default authSlice.reducer;
