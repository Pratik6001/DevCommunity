// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );
//       console.log("Login response:", res.data);
//       return res.data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message || "Login failed";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Async thunk for signup
// export const signupUser = createAsyncThunk(
//   "auth/signup",
//   async ({ name, email, password, role }, thunkAPI) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
//         { name, email, password, role },
//         { withCredentials: true }
//       );
//       return res.data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message || "Signup failed";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// const savedToken = localStorage.getItem("token");
// const savedUser = localStorage.getItem("user");

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: savedUser ? JSON.parse(savedUser) : null,
//     token: savedToken || null,
//     redirectUrl: null,
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       state.message = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     // Login handlers
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload.user && action.payload.token) {
//           state.user = {
//             username: action.payload.user.username,
//             role: action.payload.user.role,
//             id: action.payload.user.id,
//           };
//           state.token = action.payload.token;
//           state.redirectUrl = action.payload.url;

//           // Persist user and token
//           localStorage.setItem("token", action.payload.token);
//           localStorage.setItem("user", JSON.stringify(state.user));
//         }
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.user = null;
//         state.token = null;
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       });

//     // Signup handlers
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.message = action.payload.message || "Signup successful!";
//         state.error = null;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API
const API_URL = import.meta.env.VITE_SERVER_URL;

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", res.data);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for sending reset email
export const sendResetEmail = createAsyncThunk(
  "auth/sendResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/send-reset-email`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") || "guest-token"
            }`,
          },
        }
      );
      console.log("response", res);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to send reset email";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/reset-password`,
        { token, newPassword },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") || "guest-token"
            }`,
          },
        }
      );
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to reset password";
      return rejectWithValue(message);
    }
  }
);

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    redirectUrl: null,
    loading: false,
    error: null,
    message: null,
    resetEmailStatus: "idle", // idle, loading, succeeded, failed
    resetPasswordStatus: "idle",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
      state.redirectUrl = null;
      state.resetEmailStatus = "idle";
      state.resetPasswordStatus = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
      state.resetEmailStatus = "idle";
      state.resetPasswordStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // Login handlers
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user && action.payload.token) {
          state.user = {
            username: action.payload.user.username,
            role: action.payload.user.role,
            id: action.payload.user.id,
            profileComplete: action.payload.user.profileComplete,
          };
          state.token = action.payload.token;
          state.redirectUrl = action.payload.url;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(state.user));
        }
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      // Signup handlers
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Signup successful!";
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Reset Email handlers
      .addCase(sendResetEmail.pending, (state) => {
        state.resetEmailStatus = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.resetEmailStatus = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.resetEmailStatus = "failed";
        state.error = action.payload;
      })
      // Reset Password handlers
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
